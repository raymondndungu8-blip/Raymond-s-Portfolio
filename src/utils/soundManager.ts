class SoundManager {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;
  private ambientDroneNode: OscillatorNode | null = null;
  private ambientGainNode: GainNode | null = null;
  private ambientFilterNode: BiquadFilterNode | null = null;

  constructor() {
    // Lazy loaded context
  }

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (enabled) {
      this.initContext();
      this.playChime(392, 587.33, 'sine', 0.12, 0.5); // G4 & D5 crystalline chime
    } else {
      this.stopAmbientDrone();
    }
  }

  public getIsEnabled(): boolean {
    return this.isEnabled;
  }

  // Sleek futuristic click ping with cinematic reverb-like delay and sub-impact
  public playRobotClick() {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Crystalline click notes
    this.playTone(880, 'sine', 0.08, 0.6, now);
    this.playTone(1318.51, 'sine', 0.04, 0.8, now + 0.05); // E6
    this.playTone(1760, 'sine', 0.02, 1.0, now + 0.10); // A6
    
    // Sub bass seismic pulse
    this.playSubBoom(now);
  }

  private playTone(freq: number, type: OscillatorType, gainVal: number, duration: number, startTime: number) {
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(gainVal, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  private playSubBoom(startTime: number) {
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(75, startTime);
    osc.frequency.exponentialRampToValueAtTime(25, startTime + 1.0);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(80, startTime);
    
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.25, startTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.1);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + 1.2);
  }

  // Resonant low-pass opening sweep when mouse first touches the robot
  public playRobotHover() {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, now); // A2 fundamental
    osc.frequency.linearRampToValueAtTime(146.83, now + 0.4); // D3
    
    filter.type = 'lowpass';
    filter.Q.setValueAtTime(9, now);
    filter.frequency.setValueAtTime(100, now);
    filter.frequency.exponentialRampToValueAtTime(1600, now + 0.35);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.07, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.6);
  }

  // Smooth real-time modulation based on cursor coordinates relative to center
  public updateMoveModulation(normalizedX: number, normalizedY: number) {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.ctx) return;
    
    const now = this.ctx.currentTime;
    const distance = Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY);
    
    if (this.ambientFilterNode) {
      // Modulate lowpass filter frequency (300Hz up to 1400Hz depending on speed/closeness)
      const targetFreq = 220 + distance * 900;
      this.ambientFilterNode.frequency.setTargetAtTime(targetFreq, now, 0.15);
    }
    
    if (this.ambientDroneNode) {
      // Bend continuous fundamental pitch slightly
      const targetPitch = 110 + normalizedX * 8; // A2 +/- 8Hz bend
      this.ambientDroneNode.frequency.setTargetAtTime(targetPitch, now, 0.2);
    }

    if (this.ambientGainNode) {
      // Swell volume (up to 0.12) as user moves cursor closer or faster
      const targetGain = 0.04 + distance * 0.08;
      this.ambientGainNode.gain.setTargetAtTime(targetGain, now, 0.1);
    }
  }

  // Active hover triggers background mechanical/energy loop
  public startAmbientDrone() {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.ctx || this.ambientDroneNode) return;
    
    const now = this.ctx.currentTime;
    
    this.ambientDroneNode = this.ctx.createOscillator();
    this.ambientFilterNode = this.ctx.createBiquadFilter();
    this.ambientGainNode = this.ctx.createGain();
    
    this.ambientDroneNode.type = 'triangle';
    this.ambientDroneNode.frequency.setValueAtTime(110, now); // A2 fundamental hum
    
    this.ambientFilterNode.type = 'lowpass';
    this.ambientFilterNode.Q.setValueAtTime(5, now);
    this.ambientFilterNode.frequency.setValueAtTime(250, now);
    
    this.ambientGainNode.gain.setValueAtTime(0, now);
    this.ambientGainNode.gain.linearRampToValueAtTime(0.06, now + 0.4); // Seamless start sweep
    
    this.ambientDroneNode.connect(this.ambientFilterNode);
    this.ambientFilterNode.connect(this.ambientGainNode);
    this.ambientGainNode.connect(this.ctx.destination);
    
    this.ambientDroneNode.start(now);
  }

  // Fade out continuous energy loop cleanly to avoid clicks/pops
  public stopAmbientDrone() {
    if (this.ambientDroneNode && this.ctx) {
      const now = this.ctx.currentTime;
      const currentGain = this.ambientGainNode;
      const currentOsc = this.ambientDroneNode;
      
      if (currentGain) {
        currentGain.gain.setValueAtTime(currentGain.gain.value, now);
        currentGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      }
      
      setTimeout(() => {
        try {
          currentOsc.stop();
          currentOsc.disconnect();
          if (currentGain) currentGain.disconnect();
        } catch (e) {}
      }, 600);
      
      this.ambientDroneNode = null;
      this.ambientGainNode = null;
      this.ambientFilterNode = null;
    }
  }

  // Standard crystal state notification chime
  private playChime(freq1: number, freq2: number, type: OscillatorType, maxVolume: number, duration: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    const gain2 = this.ctx.createGain();
    
    osc1.type = type;
    osc1.frequency.setValueAtTime(freq1, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(maxVolume, now + 0.04);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    
    osc2.type = type;
    osc2.frequency.setValueAtTime(freq2, now + 0.07);
    gain2.gain.setValueAtTime(0, now + 0.07);
    gain2.gain.linearRampToValueAtTime(maxVolume * 0.7, now + 0.11);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.08);
    
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    
    osc1.start(now);
    osc2.start(now + 0.07);
    
    osc1.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.2);
  }
}

export const soundManager = new SoundManager();
