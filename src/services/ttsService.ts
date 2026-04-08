export type TTSState = 'idle' | 'loading' | 'playing' | 'paused';

type StateChangeCallback = (state: TTSState) => void;

class TTSService {
  private state: TTSState = 'idle';
  private listeners: Set<StateChangeCallback> = new Set();
  private synth = window.speechSynthesis;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  subscribe(callback: StateChangeCallback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private setState(newState: TTSState) {
    this.state = newState;
    this.listeners.forEach((cb) => cb(this.state));
  }

  getState() {
    return this.state;
  }

  /**
   * 播放 TTS
   * @param text 要朗读的文本
   * 
   * 注意：当前使用 Web Speech API 作为前端演示的 Fallback。
   * 实际接入后端 API 时，请将此处的逻辑替换为 fetch('/api/tts', ...) 并播放返回的音频流。
   */
  async play(text: string) {
    this.stop(); // 停止之前的播放
    this.setState('loading');

    // 模拟网络请求延迟
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!this.synth) {
      console.warn("当前浏览器不支持 Web Speech API");
      this.setState('idle');
      return;
    }

    this.currentUtterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance.lang = 'zh-CN';
    this.currentUtterance.rate = 1.0;
    this.currentUtterance.pitch = 1.0;

    this.currentUtterance.onstart = () => {
      this.setState('playing');
    };

    this.currentUtterance.onend = () => {
      this.setState('idle');
      this.currentUtterance = null;
    };

    this.currentUtterance.onerror = (e) => {
      console.error("TTS Error:", e);
      this.setState('idle');
      this.currentUtterance = null;
    };

    this.synth.speak(this.currentUtterance);
  }

  pause() {
    if (this.synth && this.state === 'playing') {
      this.synth.pause();
      this.setState('paused');
    }
  }

  resume() {
    if (this.synth && this.state === 'paused') {
      this.synth.resume();
      this.setState('playing');
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.setState('idle');
    this.currentUtterance = null;
  }
}

export const ttsService = new TTSService();
