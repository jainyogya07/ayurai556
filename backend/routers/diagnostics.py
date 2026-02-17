from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from knowledge_base import expert
from llm_engine import llm
from database import save_report, get_history
from dependencies import get_current_user

router = APIRouter(prefix="/api", tags=["Diagnostics"])

# --- Models ---

class DiagnosticRequest(BaseModel):
    pulse: Optional[Dict[str, Any]]
    tongue: Optional[Dict[str, Any]]
    questionnaire: Optional[Dict[str, Any]]

class ChatRequest(BaseModel):
    message: str
    history: List[Dict[str, str]] # [{'role': 'user', 'content': '...'}]
    context: Optional[Dict[str, Any]] = {}

# --- Helpers ---

def get_recommendations(imbalance):
    if "Pitta" in imbalance:
        return ["Cooling foods (Cucumber, Mint)", "Avoid spicy/oily food", "Moon bathing", "Meditation"]
    if "Vata" in imbalance:
        return ["Warm, cooked meals", "Regular routine", "Sesame oil massage", "Root vegetables"]
    if "Kapha" in imbalance:
        return ["Spicy, light foods", "Vigorous exercise", "Wake up early", "Ginger tea"]
    return ["Maintain balanced diet", "Yoga", "Pranayama"]

# --- Routes ---

@router.get("/history")
async def read_history(current_user: dict = Depends(get_current_user)):
    return get_history()

@router.post("/chat")
async def chat_with_vaidya(data: ChatRequest, current_user: dict = Depends(get_current_user)):
    """
    Chat with the Ayurvedic AI using the context of a specific report.
    """
    response = llm.chat_with_context(data.history, data.message, data.context)
    return {"response": response}

@router.post("/diagnose")
async def diagnose(data: DiagnosticRequest, current_user: dict = Depends(get_current_user)):
    try:
        symptoms = []
        
        # 1. Pulse Analysis
        if data.pulse:
            bpm = data.pulse.get("bpm")
            if bpm:
                if bpm > 90: symptoms.append("High Heart Rate (Pitta/Vata)")
                elif bpm < 60: symptoms.append("Low Heart Rate (Kapha)")
                
        # 2. Tongue Analysis
        if data.tongue and data.tongue.get("diagnosis"):
            symptoms.extend(data.tongue["diagnosis"])

        # 3. Questionnaire
        if data.questionnaire:
            q = data.questionnaire
            if q.get("sleep") == "disturbed": symptoms.append("Disturbed Sleep (Vata)")
            if q.get("digestion") == "acidic": symptoms.append("Acidic Digestion (Pitta)")
            if q.get("digestion") == "bloating": symptoms.append("Bloating (Vata)")
            if q.get("digestion") == "slow": symptoms.append("Slow Digestion (Kapha)")
            
            if q.get("energy") == "high": symptoms.append("High Energy")
            if q.get("energy") == "low": symptoms.append("Low Energy")
            if q.get("energy") == "variable": symptoms.append("Variable Energy")
                 
        # Inference (Rule-Based + Contradictions)
        diagnosis, scores, evidence, contradictions = expert.infer_dosha(symptoms)
            
        # Generative AI Report (Ollama)
        llm_result = llm.generate_report(diagnosis, symptoms, scores, contradictions)
        
        # Default values
        explanation = f"Primary imbalance detected as {diagnosis}. " + " | ".join(evidence)
        recommendations = get_recommendations(diagnosis)
        depth = "Rule-Based (Standard)"
        reasoning = "Diagnosis based on algorithmic rule matching of pulse rate and reported symptoms."
        reference = "General Ayurvedic Principles"
        confidence = 75 # Default rule-based confidence
        
        if llm_result:
            explanation = llm_result.get("explanation", explanation)
            recommendations = llm_result.get("recommendations", recommendations)
            depth = "Generative AI (Deep Analysis)"
            reasoning = llm_result.get("reasoning", reasoning)
            reference = llm_result.get("reference", reference)
            confidence = llm_result.get("confidence_score", 85)
            
        # Save to DB (Modified to include new fields in explanation for now, or just save standard)
        # For this iteration, we might not change DB schema yet, but we return to frontend.
        # We append reasoning to explanation for storage if DB is strict, or just pass it through.
        full_explanation = f"{explanation}\n\nReasoning: {reasoning}\nReference: {reference}"
        report_id = save_report(diagnosis, symptoms, scores, contradictions, full_explanation, recommendations)
            
        # Mock FHIR Report
        fhir_report = {
            "resourceType": "Composition",
            "id": str(report_id) if report_id else "temp",
            "status": "final",
            "type": {
                "coding": [{
                    "system": "http://loinc.org",
                    "code": "11502-2",
                    "display": "Laboratory report"
                }]
            },
            "subject": {"reference": "Patient/123"},
            "date": "2024-05-21",
            "title": "AyurAI Diagnostic Report",
            "section": [
                {
                    "title": "Ayurvedic Constitution",
                    "code": {"text": "Prakriti/Vikriti"},
                    "text": {
                        "status": "generated",
                        "div": f"<div xmlns='http://www.w3.org/1999/xhtml'>Primary Imbalance: <b>{diagnosis}</b></div>"
                    }
                },
                {
                    "title": "Clinical Reasoning",
                    "text": {
                        "status": "generated",
                        "div": f"<div xmlns='http://www.w3.org/1999/xhtml'>{explanation}</div>"
                    }
                }
            ]
        }

        return {
            "id": report_id,
            "diagnosis": diagnosis,
            "details": evidence,
            "contradictions": contradictions,
            "scores": scores,
            "fhir_report": fhir_report,
            "recommendations": recommendations,
            "recommendations": recommendations,
            "analysis_depth": depth,
            "reasoning": reasoning,
            "reference": reference,
            "confidence_score": confidence
        }
    except Exception as e:
        # We assume main.py handles global exceptions, but we can re-raise
        raise e

@router.post("/feedback")
async def submit_feedback(data: Dict[str, Any], current_user: dict = Depends(get_current_user)):
    # Expected: { "report_id": 1, "rating": 5, "comments": "Great!" }
    report_id = data.get("report_id")
    rating = data.get("rating")
    comments = data.get("comments", "")
    
    if not report_id or not rating:
        raise HTTPException(status_code=400, detail="Report ID and Rating are required.")
        
    from database import save_feedback
    success = save_feedback(report_id, rating, comments)
    return {"success": success}

@router.post("/admin/reload-rules")
async def reload_rules(current_user: dict = Depends(get_current_user)):
    # Simple check for admin (in a real app, check role)
    if current_user['email'] != "admin@ayurai.com":
         raise HTTPException(status_code=403, detail="Admin privileges required")
    expert.reload_rules()
    return {"message": "Diagnostic rules reloaded from configuration."}

@router.get("/reports/{report_id}/pdf")
async def get_report_pdf(report_id: int, current_user: dict = Depends(get_current_user)):
    # Fetch from DB
    history = get_history(limit=100) # Simple fetch for now, ideally get_by_id
    report = next((r for r in history if r["id"] == report_id), None)
    
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
        
    from pdf_generator import generate_pdf_report
    from fastapi.responses import StreamingResponse
    
    pdf_buffer = generate_pdf_report(report)
    
    return StreamingResponse(
        pdf_buffer, 
        media_type="application/pdf", 
        headers={"Content-Disposition": f"attachment; filename=AyurAI_Report_{report_id}.pdf"}
    )
