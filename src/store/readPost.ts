import { atom } from 'nanostores';
import { $activePlayerId } from './player'; // import store quản lý audio có sẵn của bạn để tương tác

export const $isReading = atom(false);
export const $isAutoRepeat = atom(false);

let currentUtterance: SpeechSynthesisUtterance | null = null;

function getPostContent() {
  const contentElement = document.querySelector('article') || document.querySelector('.content');
  return contentElement ? (contentElement as HTMLElement).innerText : '';
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  $isReading.set(false);
}

export function startSpeaking() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  // Nếu có nhạc nền BGM đang phát, tạm dừng nó để ưu tiên giọng đọc
  if ($activePlayerId.get()) {
    // Bạn có thể kích hoạt logic pause player ở đây nếu muốn
  }

  const text = getPostContent();
  if (!text) return;

  window.speechSynthesis.cancel(); // Xóa các hàng đợi cũ

  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.lang = document.documentElement.lang || 'vi-VN';
  currentUtterance.rate = 1.1;

  // Chọn giọng đọc hay nếu có
  const voices = window.speechSynthesis.getVoices();
  const optimalVoice = voices.find((v) => v.lang.includes('vi') && (v.name.includes('Natural') || v.name.includes('Google')));
  if (optimalVoice) currentUtterance.voice = optimalVoice;

  currentUtterance.onstart = () => {
    $isReading.set(true);
  };

  currentUtterance.onend = () => {
    $isReading.set(false);
    // Nếu chế độ AutoRepeat đang bật, tự động kích hoạt đọc lại sau 1 giây
    if ($isAutoRepeat.get()) {
      setTimeout(() => {
        if ($isAutoRepeat.get()) startSpeaking(); // kiểm tra lại đề phòng user vừa tắt
      }, 1000);
    }
  };

  currentUtterance.onerror = () => {
    $isReading.set(false);
  };

  window.speechSynthesis.speak(currentUtterance);
}

export function toggleReading() {
  if ($isReading.get()) {
    stopSpeaking();
  } else {
    startSpeaking();
  }
}

export function toggleAutoRepeat() {
  $isAutoRepeat.set(!$isAutoRepeat.get());
}

// Lắng nghe sự kiện chuyển trang trong Astro để dừng đọc ngay lập tức
if (typeof document !== 'undefined') {
  document.addEventListener('astro:before-preparation', () => {
    stopSpeaking();
  });
}
