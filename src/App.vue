<template>
  <div v-if="weddingData">
    <!-- Nút Toggle Âm Nhạc Cố Định -->
     <button
      v-if="isOpened"
      class="music-toggle-btn"
      :class="{ palying: isPlaying }"
      @click="toggleMusic"
     >
      💿
     </button>
     <audio ref="bgAudio" :src="weddingData.bgMusic" loop></audio>
     <!-- Trang Cửa Thiệp Cưới -->
    <CoverDoor :data="weddingData" :is-opened="isOpened" @open="handleOpenCard" />
    <!-- Nội dung chính sau khi mở cửa -->
     <main v-if="isOpened" class="main-content">
      <HeroSection :data="weddingData" :guest-name="guestName" />
      <CountdownSection :wedding-date-i-s-o="weddingData.weddingDateISO" />
      <TimelineSection :timeline="weddingData.timeline" />
      <GallerySection 
        :gallery="weddingData.gallery" 
        :groom-name="weddingData.groom?.shortName"
        :bride-name="weddingData.bride?.shortName"
      />
      <ParentSection :data="weddingData" />
      <VenueSection />
      <GiftSection />
      <FooterSection />
     </main>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import CoverDoor from './components/CoverDoor.vue';
import HeroSection from './components/HeroSection.vue';
import CountdownSection from './components/CountdownSection.vue';
import ParentSection from './components/ParentSection.vue';
import TimelineSection from './components/TimelineSection.vue';
import GallerySection from './components/GallerySection.vue';
import VenueSection from './components/VenueSection.vue';
import GiftSection from './components/GiftSection.vue';
import FooterSection from './components/FooterSection.vue';

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
    FooterSection
  },
  setup() {
    const weddingData = ref(null)
    const isOpened = ref(false)
    const guestName = ref('')
    const isPlaying = ref(false)
    const bgAudio = ref(null)

    onMounted(async () => {
      // Đọc dữ liệu JSON
      const res = await fetch('data.json')
      weddingData.value = await res.json()
      // Đọc tên khách từ URL param (?guest=Nguyễn+Văn+A)
      const urlParams = new URLSearchParams(window.location.search)
      const directGuestName = urlParams.get('guest')
      if (directGuestName) {
        guestName.value = directGuestName
      }
    })

    const handleOpenCard = () => {
      isOpened.value = true
      document.body.classList.remove('is-locked')
      // Phát nhạc khi mở thiệp
      if (bgAudio.value) {
        bgAudio.value.play().then(() => {
          isPlaying.value = true
        }).catch(() => {})
      }
    }

    const toggleMusic = () => {
      if (!bgAudio.value) return
      if (isPlaying.value) {
        bgAudio.value.pause()
      } else {
        bgAudio.value.play()
      }
      isPlaying.value = !isPlaying.value
    }
    
    onMounted(() => {
      // 1. Lấy thông số tham số từ URL
      const urlParams = new URLSearchParams(window.location.search)
      const toParam = urlParams.get('to')

      if (toParam) {
        // 2. Decode các ký tự tiếng Việt hoặc dấu cộng / %20 thành khoảng trắng
        try {
          guestName.value = decodeURIComponent(toParam.replace(/\+/g, ' '))
        } catch (e) {
          guestName.value = toParam
        }
      }
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