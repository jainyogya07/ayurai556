from ultralytics import YOLO
import logging
import os

logger = logging.getLogger("AyurAI.YOLO")

class AyurYOLO:
    def __init__(self, model_path="yolov8l-cls.pt"):
        # Load the "Large" YOLOv8 model - The strongest standard classifier in the v8 family
        # capable of detecting intricate textures and micro-patterns.
        self.model = YOLO(model_path) 
        logger.info(f"Loaded Maha-Vajra-YOLO (v8l-cls) from {model_path}")

    def predict(self, image):
        """
        Runs inference on the image.
        Returns top class index and confidence.
        """
        # Run inference with Test Time Augmentation (augment=True)
        # This creates multiple cropped/flipped versions internally and averages the results
        results = self.model(image, verbose=False, augment=True)
        
        # Extract classification results
        # Note: Since this is pretrained on ImageNet, we map the output abstractly for the demo
        # knowing that we'd normally train it on a custom dataset.
        
        # results[0].probs is the specific attribute for classification models
        if results and results[0].probs:
            probs = results[0].probs.data
            conf, idx = probs.topk(1)
            return conf.item(), idx.item()
        
        return 0.0, 0
