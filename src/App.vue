<template>
  <div v-if="weddingData">
    <!-- Nút Chuyển Đổi Ngôn Ngữ Nhanh (Luôn hiển thị kể cả trước khi mở cửa) -->
    <button
      class="lang-toggle-btn"
      @click="toggleLanguage"
      :title="currentLang === 'vi' ? 'Switch to Korean' : 'Chuyển sang Tiếng Việt'"
    >
      <span class="lang-flag">{{ currentLang === 'vi' ? '🇰🇷' : '🇻🇳' }}</span>
      <span class="lang-text">{{ currentLang === 'vi' ? 'KR' : 'VI' }}</span>
    </button>

    <!-- Nút Toggle Âm Nhạc Cố Định -->
    <button
      v-if="isOpened"
      class="music-toggle-btn"
      :class="{ playing: isPlaying }"
      @click="toggleMusic"
      :title="t.toggleMusicTitle"
    >
      <span class="disc-icon">💿</span>
    </button>
    <audio ref="bgAudio" :src="weddingData.bgMusic" loop></audio>

    <!-- Trang Cửa Thiệp Cưới -->
    <CoverDoor :data="weddingData" :is-opened="isOpened" @open="handleOpenCard" />

    <!-- Nội dung chính sau khi mở cửa -->
    <main v-if="isOpened" class="main-content">
      <HeroSection class="reveal-section" :data="weddingData" :guest-name="guestName" />
      <CountdownSection class="reveal-section" :wedding-date-i-s-o="weddingData.weddingDateISO" />
      <TimelineSection class="reveal-section" :timeline="weddingData.timeline" />
      <GallerySection 
        class="reveal-section"
        :gallery="weddingData.gallery" 
        :groom-name="weddingData.groom?.shortName"
        :bride-name="weddingData.bride?.shortName"
      />
      <ParentSection class="reveal-section" :data="weddingData" />
      <VenueSection class="reveal-section" />
      <RSVPSection class="reveal-section" :guestName="guestName" :scriptUrl="weddingData.rsvp_script_url" />
      <GiftSection class="reveal-section" />
      <FooterSection class="reveal-section" />
    </main>
  </div>
</template>

<script>
import { onMounted, ref, nextTick, onUnmounted } from 'vue';
import { useLanguage } from './i18n/translations'; // Import hook ngôn ngữ
import CoverDoor from './components/CoverDoor.vue';
import HeroSection from './components/HeroSection.vue';
import CountdownSection from './components/CountdownSection.vue';
import ParentSection from './components/ParentSection.vue';
import TimelineSection from './components/TimelineSection.vue';
import GallerySection from './components/GallerySection.vue';
import VenueSection from './components/VenueSection.vue';
import GiftSection from './components/GiftSection.vue';
import FooterSection from './components/FooterSection.vue';
import RSVPSection from './components/RSVPSection.vue';

export default {
  name: 'App',
  components: {
    CoverDoor,
    HeroSection,
    CountdownSection,
    TimelineSection,
    GallerySection,
    ParentSection,
    VenueSection,
    GiftSection,
    FooterSection,
    RSVPSection
  },
  setup() {
    const { currentLang, t, toggleLanguage, setLanguage } = useLanguage();
    const weddingData = ref(null);
    const isOpened = ref(false);
    const guestName = ref('');
    const isPlaying = ref(false);
    const bgAudio = ref(null);
    let observer = null;

    onMounted(async () => {
      try {
        const res = await fetch('data.json');
        weddingData.value = await res.json();
      } catch (err) {
        console.error('Lỗi tải dữ liệu thiệp:', err);
      }

      const urlParams = new URLSearchParams(window.location.search);
      
      // Hỗ trợ tham số ?lang=ko trên URL để gửi link trực tiếp cho khách Hàn
      const langParam = urlParams.get('lang');
      if (langParam === 'ko' || langParam === 'kr') {
        setLanguage('ko');
      }

      const rawParam = urlParams.get('to') || urlParams.get('guest');
      if (rawParam) {
        try {
          guestName.value = decodeURIComponent(rawParam.replace(/\+/g, ' '));
        } catch (e) {
          guestName.value = rawParam;
        }
      }
    });

    const initScrollObserver = () => {
      const options = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15
      };

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, options);

      const sections = document.querySelectorAll('.reveal-section');
      sections.forEach((sec) => observer.observe(sec));
    };

    const handleOpenCard = () => {
      isOpened.value = true;
      document.body.classList.remove('is-locked');
      
      if (bgAudio.value) {
        bgAudio.value.play().then(() => {
          isPlaying.value = true;
        }).catch((err) => {
          console.warn('Trình duyệt chặn tự động phát âm thanh:', err);
          isPlaying.value = false;
        });
      }

      nextTick(() => {
        initScrollObserver();
      });
    };

    const toggleMusic = () => {
      if (!bgAudio.value) return;
      if (isPlaying.value) {
        bgAudio.value.pause();
        isPlaying.value = false;
      } else {
        bgAudio.value.play().then(() => {
          isPlaying.value = true;
        });
      }
    };

    onUnmounted(() => {
      if (observer) observer.disconnect();
    });

    return {
      currentLang,
      t,
      toggleLanguage,
      weddingData,
      guestName,
      isOpened,
      isPlaying,
      bgAudio,
      handleOpenCard,
      toggleMusic
    };
  }
}
</script>

<style scoped>
/* Nút Chuyển Đổi Ngôn Ngữ Cố Định Góc Trái (hoặc trên góc phải) */
.lang-toggle-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000; /* Cao hơn cả CoverDoor (z-index: 100) */
  height: 38px;
  padding: 0 14px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(192, 156, 93, 0.6);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
}

.lang-toggle-btn:hover {
  transform: translateY(-2px);
  background: #ffffff;
  border-color: #a32a29;
}

.lang-flag {
  font-size: 1.1rem;
  line-height: 1;
}

.lang-text {
  font-size: 0.78rem;
  font-weight: 700;
  color: #7d6b54;
  letter-spacing: 0.5px;
}

/* Nút Đĩa Nhạc Cố Định Góc Phải */
.music-toggle-btn {
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 9999;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(192, 156, 93, 0.5);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  padding: 0;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.music-toggle-btn:hover {
  transform: scale(1.1);
  background: #ffffff;
}

.disc-icon {
  font-size: 1.5rem;
  line-height: 1;
  display: inline-block;
  animation: spin 3s linear infinite;
  animation-play-state: paused;
}

.music-toggle-btn.playing .disc-icon {
  animation-play-state: running;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 576px) {
  .lang-toggle-btn {
    top: 15px;
    right: 15px;
    height: 34px;
    padding: 0 11px;
  }
  .music-toggle-btn {
    bottom: 20px;
    right: 20px;
    width: 42px;
    height: 42px;
  }
  .disc-icon {
    font-size: 1.3rem;
  }
}
</style>

<!-- Giữ nguyên phần <style> global bên dưới -->
<style>
html { scroll-behavior: smooth; }
.reveal-section {
  opacity: 0;
  transform: translateY(45px);
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}
.reveal-section.is-visible { opacity: 1; transform: translateY(0); }
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #fbf9f6; }
::-webkit-scrollbar-thumb { background: #c09c5d; border-radius: 4px; border: 2px solid #fbf9f6; }
::-webkit-scrollbar-thumb:hover { background: #a32a29; }
* { scrollbar-width: thin; scrollbar-color: #c09c5d #fbf9f6; }
</style>