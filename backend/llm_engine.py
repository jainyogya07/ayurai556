import requests
import json
import logging

class LLMEngine:
    def __init__(self, model="llama3", base_url="http://localhost:11434"):
        self.model = model
        self.base_url = base_url
        self.logger = logging.getLogger("AyurAI.LLM")

    def check_connection(self):
        try:
            requests.get(f"{self.base_url}/api/tags")
            return True
        except requests.exceptions.ConnectionError:
            return False

    def generate_report(self, diagnosis, symptoms, scores, contradictions):
        if not self.check_connection():
            return None # Fallback to rule-based

        prompt = f"""
        You are an expert Ayurvedic Physician (Vaidya) with 30 years of experience.
        Analyze the following bio-data and generate a personalized clinical report.
        
        **Patient Data:**
        - Primary Diagnosis: {diagnosis}
        - Dosage Scores: Vata: {scores['Vata']}, Pitta: {scores['Pitta']}, Kapha: {scores['Kapha']}
        - Observed Symptoms: {', '.join(symptoms)}
        - Detected Contradictions: {', '.join(contradictions) if contradictions else "None"}
        
        **Instructions:**
        1. Explain the diagnosis in simple but professional terms.
        2. If contradictions exist, explain why (e.g., "High energy but slow digestion suggests specific sub-dosha imbalance").
        3. Provide 3 specific, actionable lifestyle recommendations.
        4. Tone: Empathetic, Authoritative, Holistic.
        5. **Explainable AI**:
           - **Reasoning**: Explain the physiological link between symptoms and the diagnosis.
           - **Classical Reference**: Cite a relevant Ayurvedic text (e.g., Charaka Samhita, Sushruta Samhita) that supports this.
           - **Confidence Score**: Estimate confidence (0-100) based on data consistency.
        6. Output Format: JSON with keys:
           - "explanation" (string)
           - "recommendations" (list of strings)
           - "reasoning" (string)
           - "reference" (string)
           - "confidence_score" (integer)
           - "analysis_depth" (string)
        """
        
        try:
            response = requests.post(
                f"{self.base_url}/api/generate",
                json={
                    "model": self.model,
                    "prompt": prompt,
                    "format": "json",
                    "stream": False
                },
                timeout=30
            )
            response.raise_for_status()
            return response.json().get("response")
        except Exception as e:
            self.logger.error(f"LLM Generation failed: {e}")
            return None


    def chat_with_context(self, history, message, context):
        if not self.check_connection():
            return "I apologize, but I am currently unable to access my medical knowledge base. Please try again later."

        system_prompt = f"""
        You are an expert Ayurvedic Physician (Vaidya).
        
        **Context:**
        User's latest diagnosis: {context.get('diagnosis', 'Unknown')}
        Explanation: {context.get('explanation', 'N/A')}
        Recommendations: {context.get('recommendations', 'N/A')}
        
        **Instructions:**
        1. Answer the user's question based on the diagnosis context.
        2. Keep answers concise, empathetic, and holistic.
        3. Do not give pharmaceutical advice. Stick to lifestyle, diet, and Ayurvedic herbs.
        """
        
        # Build conversation format for Ollama (Llama3-style)
        prompt = f"<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|>"
        
        for msg in history:
            role = "user" if msg['role'] == 'user' else "assistant"
            prompt += f"<|start_header_id|>{role}<|end_header_id|>\n\n{msg['content']}<|eot_id|>"
            
        prompt += f"<|start_header_id|>user<|end_header_id|>\n\n{message}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n"

        try:
            response = requests.post(
                f"{self.base_url}/api/generate",
                json={
                    "model": self.model,
                    "prompt": prompt,
                    "stream": False
                },
                timeout=30
            )
            response.raise_for_status()
            return response.json().get("response")
        except Exception as e:
            self.logger.error(f"LLM Chat generation failed: {e}")
            return "I am having trouble connecting to my thought process right now."

llm = LLMEngine()
