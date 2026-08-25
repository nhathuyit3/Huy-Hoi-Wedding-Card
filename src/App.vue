<template>
  <div v-if="weddingData">
    <!-- Nút Toggle Âm Nhạc Cố Định -->
    <button
      v-if="isOpened"
      class="music-toggle-btn"
      :class="{ playing: isPlaying }"
      @click="toggleMusic"
      title="Bật/Tắt Nhạc"
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
    const weddingData = ref(null)
    const isOpened = ref(false)
    const guestName = ref('')
    const isPlaying = ref(false)
    const bgAudio = ref(null)
    let observer = null

    onMounted(async () => {
      // Đọc dữ liệu JSON
      try {
        const res = await fetch('data.json')
        weddingData.value = await res.json()
      } catch (err) {
        console.error('Lỗi tải dữ liệu thiệp:', err)
      }

      // Đọc tên khách từ URL param (?to= hoặc ?guest=)
      const urlParams = new URLSearchParams(window.location.search)
      const rawParam = urlParams.get('to') || urlParams.get('guest')
      if (rawParam) {
        try {
          guestName.value = decodeURIComponent(rawParam.replace(/\+/g, ' '))
        } catch (e) {
          guestName.value = rawParam
        }
      }
    })

    // Khởi tạo quan sát vị trí scroll của các Section
    const initScrollObserver = () => {
      const options = {
        root: null,
        rootMargin: '0px 0px -80px 0px', // Kích hoạt sớm 80px trước khi section vào hẳn màn hình
        threshold: 0.15
      }

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            // Quan sát 1 lần duy nhất để giữ trạng thái đã hiển thị
            observer.unobserve(entry.target)
          }
        })
      }, options)

      const sections = document.querySelectorAll('.reveal-section')
      sections.forEach((sec) => observer.observe(sec))
    }

    const handleOpenCard = () => {
      isOpened.value = true
      document.body.classList.remove('is-locked')
      
      // Phát nhạc khi mở thiệp
      if (bgAudio.value) {
        bgAudio.value.play().then(() => {
          isPlaying.value = true
        }).catch((err) => {
          console.warn('Trình duyệt chặn tự động phát âm thanh:', err)
          isPlaying.value = false
        })
      }

      // Đợi DOM render main content xong thì gắn observer
      nextTick(() => {
        initScrollObserver()
      })
    }

    const toggleMusic = () => {
      if (!bgAudio.value) return
      if (isPlaying.value) {
        bgAudio.value.pause()
        isPlaying.value = false
      } else {
        bgAudio.value.play().then(() => {
          isPlaying.value = true
        })
      }
    }

    onUnmounted(() => {
      if (observer) observer.disconnect()
    })

    return {
      weddingData,
      guestName,
      isOpened,
      isPlaying,
      bgAudio,
      handleOpenCard,
      toggleMusic
    }
  }
}
</script>

<style scoped>
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
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 576px) {
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

<!-- TÙY CHỈNH SCROLLBAR, SMOOTH SCROLL & HIỆU ỨNG REVEAL SECTION -->
<style>
/* 1. Mượt hóa chuyển động cuộn khi nhảy anchor link (#venue,...) */
html {
  scroll-behavior: smooth;
}

/* 2. Hiệu ứng cuộn tới đâu nổi từ dưới lên tới đó (Fade-in Up) */
.reveal-section {
  opacity: 0;
  transform: translateY(45px);
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

.reveal-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* 3. Thanh cuộn tùy chỉnh tông màu Vintage Gold sang trọng */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #fbf9f6;
}

::-webkit-scrollbar-thumb {
  background: #c09c5d;
  border-radius: 4px;
  border: 2px solid #fbf9f6;
}

::-webkit-scrollbar-thumb:hover {
  background: #a32a29;
}

/* Hỗ trợ Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #c09c5d #fbf9f6;
}
</style>