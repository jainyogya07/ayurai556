import cv2
import numpy as np
from scipy import signal

class RPPGProcessor:
    def __init__(self, buffer_size=150):
        self.buffer_size = buffer_size
        self.red_channel_buffer = []
        self.fps = 30  # Assumed FPS
        
    def process_frame(self, frame_bytes):
        # Convert bytes to numpy array
        nparr = np.frombuffer(frame_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if img is None:
            return None
            
        # Detect Face (Simplified: Center Crop)
        h, w, _ = img.shape
        center_h, center_w = h // 2, w // 2
        rect_size = 100
        roi = img[center_h-rect_size:center_h+rect_size, center_w-rect_size:center_w+rect_size]
        
        # Calculate mean of Green channel
        g_mean = np.mean(roi[:, :, 1])
        
        # Add to buffer
        self.red_channel_buffer.append(g_mean)
        if len(self.red_channel_buffer) > self.buffer_size:
            self.red_channel_buffer.pop(0)
        
        # Calculate signal for visualization
        signal_val = 0
        if len(self.red_channel_buffer) > 10:
             signal_val = g_mean - np.mean(self.red_channel_buffer)
            
        bpm, snr = self.calculate_heart_rate()
        
        return {
            "bpm": bpm,
            "signal": signal_val,
            "snr": snr
        }
        
    def calculate_heart_rate(self):
        if len(self.red_channel_buffer) < self.buffer_size:
            return None, 0
            
        # Signal processing
        data = np.array(self.red_channel_buffer)
        
        # Detrending
        detrended = signal.detrend(data)
        
        # Bandpass Filter (0.7Hz to 4Hz -> 42 to 240 BPM)
        try:
            b, a = signal.butter(2, [0.7, 4.0], btype='bandpass', fs=self.fps)
            filtered = signal.filtfilt(b, a, detrended)
        except ValueError:
            return None, 0
            
        # Time Domain Peak Detection
        peaks, properties = signal.find_peaks(filtered, distance=self.fps/2.5, prominence=0.1) # Min dist ~0.4s (150 BPM limit) for stability
        
        bpm = 0
        snr = 0
        
        if len(peaks) > 2:
            # Calculate BPM from peak intervals
            intervals = np.diff(peaks)
            avg_interval = np.mean(intervals)
            bpm = (60 * self.fps) / avg_interval
            
            # Simple SNR: Peak height vs background noise
            signal_power = np.mean(filtered[peaks]**2)
            noise_power = np.mean(filtered**2) - signal_power
            if noise_power > 0:
                snr = 10 * np.log10(signal_power / noise_power)
        
        # Fallback to FFT if time domain fails or is erratic
        if bpm == 0 or bpm > 200 or bpm < 40:
             # FFT
            fft = np.fft.rfft(filtered)
            freqs = np.fft.rfftfreq(len(filtered), 1.0/self.fps)
            msg_idx = np.argmax(np.abs(fft))
            bpm = freqs[msg_idx] * 60
            
        return int(bpm), round(snr, 2)

# Global instance for demo simple state
processor = RPPGProcessor()
