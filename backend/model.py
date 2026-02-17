import torch
import torch.nn as nn
import torchvision.models as models
import logging

logger = logging.getLogger("AyurAI.Model")

class AyurVisionNet(nn.Module):
    def __init__(self, num_classes=3, pretrained=True):
        super(AyurVisionNet, self).__init__()
        # Use ResNet50 for deeper, stronger feature extraction
        self.backbone = models.resnet50(pretrained=pretrained)
        
        # ResNet50 final layer has 2048 input features
        num_ftrs = self.backbone.fc.in_features
        self.backbone.fc = nn.Sequential(
            nn.Dropout(0.5),
            nn.Linear(num_ftrs, 512), # Wider hidden layer for "Stronger" capacity
            nn.ReLU(),
            nn.Dropout(0.4),
            nn.Linear(512, 128),
            nn.ReLU(),
            nn.Linear(128, num_classes) # Vata, Pitta, Kapha
        )
        
    def forward(self, x):
        return self.backbone(x)

def load_model(model_path=None):
    """
    Loads the AyurVisionNet model.
    If model_path is provided, loads weights.
    Otherwise, returns a model with pretrained backbone (useful for inference/mocking).
    """
    model = AyurVisionNet()
    model.eval() # Set to evaluation mode
    
    if model_path:
        try:
            model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
            logger.info(f"Loaded custom weights from {model_path}")
        except Exception as e:
            logger.error(f"Failed to load weights: {e}")
            logger.warning("Using pretrained backbone with random head (Mock Mode)")
    else:
        logger.info("Initialized model with pretrained backbone (Mock Mode)")
        
    return model
