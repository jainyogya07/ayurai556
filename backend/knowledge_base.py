import json
import os

class AyurvedicExpertSystem:
    def __init__(self, rules_file="rules.json"):
        self.rules_file = rules_file
        self.rules = self.load_rules()

    def load_rules(self):
        if os.path.exists(self.rules_file):
            try:
                with open(self.rules_file, 'r') as f:
                    return json.load(f)
            except Exception as e:
                print(f"Error loading rules: {e}")
        
        # Fallback Defaults
        return {
            "High Heart Rate (Pitta/Vata)": (1, 2, 0),
            "Low Heart Rate (Kapha)": (0, 0, 2),
            "Irregular Rhythm": (3, 0, 0),
            "Red Tip (Heart Logic/Pitta)": (0, 3, 0),
            "Red Sides (Liver/Spleen Pitta)": (0, 3, 0),
            "White Coating (Ama/Toxins)": (0, 0, 3),
            "White Center (Stomach Ama)": (0, 0, 2),
            "Pale Tongue (Vata/Anemia)": (2, 0, 0),
            "Disturbed Sleep (Vata)": (2, 0, 0),
            "Acidic Digestion (Pitta)": (0, 2, 0),
            "Bloating (Vata)": (2, 0, 0),
            "Slow Digestion (Kapha)": (0, 0, 2),
            "High Energy": (1, 2, 0),
            "Low Energy": (0, 0, 2),
            "Variable Energy": (2, 0, 0)
        }

    def reload_rules(self):
        self.rules = self.load_rules()
        return True

    def infer_dosha(self, symptoms):
        scores = {"Vata": 0, "Pitta": 0, "Kapha": 0}
        evidence = []
        
        for symptom in symptoms:
            if symptom in self.rules:
                w_v, w_p, w_k = self.rules[symptom]
                scores["Vata"] += w_v
                scores["Pitta"] += w_p
                scores["Kapha"] += w_k
                evidence.append(f"{symptom} (+V:{w_v}, +P:{w_p}, +K:{w_k})")
        
        # Contradiction Check
        contradictions = self.detect_contradictions(symptoms)
        
        # Determine Dominant
        max_score = max(scores.values())
        if max_score == 0:
            return "Balanced", scores, evidence, contradictions
            
        dominant = [k for k, v in scores.items() if v == max_score]
        
        if len(dominant) == 1:
            diagnosis = f"{dominant[0]} Aggravation"
        elif len(dominant) == 2:
            diagnosis = f"{dominant[0]}-{dominant[1]} Dual Imbalance"
        else:
            diagnosis = "Tridoshic Disturbance"
            
        return diagnosis, scores, evidence, contradictions

    def detect_contradictions(self, symptoms):
        issues = []
        
        # Logic: Check for opposing qualities in the symptom list
        has_heat = any("Pitta" in s or "Red" in s or "Acidic" in s for s in symptoms)
        has_cold = any("Kapha" in s or "Pale" in s or "Slow" in s for s in symptoms)
        
        has_hyper = any("High" in s or "Fast" in s for s in symptoms)
        has_hypo = any("Low" in s or "Slow" in s or "Lethargic" in s for s in symptoms)
        
        if has_heat and has_cold:
            issues.append("Conflicting Thermal Energy (Vishama Agni)")
            
        if has_hyper and has_hypo:
            issues.append("Energy Mismatch (Possible Thyroid/Adrenal Stress)")
            
        return issues

expert = AyurvedicExpertSystem()
