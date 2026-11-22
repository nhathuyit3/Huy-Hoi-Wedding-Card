<template>
  <section class="section gallery-section full-width-section" :class="{ 'ko-font': currentLang === 'ko' }">
    <div class="gallery-container">
      <!-- Tiêu đề Gallery -->
      <div class="gallery-header">
        <p class="section-subheading">{{ t.gallerySubheading }}</p>
        <h2 class="couple-title" :class="{ 'ko-font': currentLang === 'ko' }">
          {{ displayGroomName }} &amp; {{ displayBrideName }}
        </h2>
        <p class="scroll-hint" :class="{ 'ko-font': currentLang === 'ko' }">
          {{ t.galleryScrollHint }} &circlearrowright;
        </p>
      </div>

      <!-- Khung xoay 3D cuộn phim tròn -->
      <div 
        class="reel-viewport" 
        @mousedown="startDrag" 
        @mousemove="onDrag" 
        @mouseup="stopDrag" 
        @mouseleave="stopDrag"
        @touchstart="startDrag"
        @touchmove="onDrag"
        @touchend="stopDrag"
        @wheel.prevent="onWheel"
      >
        <!-- Trục xoay tròn 3D -->
        <div 
          class="reel-cylinder" 
          :style="{ transform: `rotateY(${rotationAngle}deg)` }"
        >
          <div 
            v-for="(imgUrl, index) in galleryList" 
            :key="index" 
            class="reel-frame"
            :style="getFrameStyle(index)"
            @click="openLightbox(index)"
          >
            <!-- Lỗ đục phim mép trên -->
            <div class="film-sprockets top"></div>
            
            <div class="photo-inner">
              <img 
                :src="imgUrl" 
                :alt="`${t.galleryFrameAlt} ${index + 1}`"
                loading="eager"
                decoding="sync"
                @error="onImageError"
              />
            </div>

            <!-- Lỗ đục phim mép dưới -->
            <div class="film-sprockets bottom"></div>
          </div>
        </div>
      </div>

      <!-- 💡 Dùng Teleport để chuyển Lightbox ra khỏi khung 3D, gắn thẳng vào thẻ <body> -->
      <Teleport to="body">
        <div v-if="selectedImageIndex !== null" class="lightbox" @click="closeLightbox">
          <button class="lightbox-close" @click.stop="closeLightbox">&times;</button>
          <button class="lightbox-nav prev" @click.stop="prevImage">&lsaquo;</button>
          
          <div class="lightbox-content" @click.stop>
            <img :src="galleryList[selectedImageIndex]" :alt="t.galleryLightboxAlt" />
          </div>

          <button class="lightbox-nav next" @click.stop="nextImage">&rsaquo;</button>
        </div>
      </Teleport>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLanguage } from '../i18n/translations' // Lưu ý đường dẫn tương đối theo cấu trúc dự án

export default {
  name: 'GallerySection',
  props: {
    gallery: {
      type: Array,
      default: () => []
    },
    groomName: {
      type: String,
      default: ''
    },
    brideName: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { currentLang, t } = useLanguage()

    const galleryList = computed(() => props.gallery)
    const selectedImageIndex = ref(null)

    const displayGroomName = computed(() => {
      if (currentLang.value === 'ko') return t.value.defaultGroom
      return props.groomName || t.value.defaultGroom
    })

    const displayBrideName = computed(() => {
      if (currentLang.value === 'ko') return t.value.defaultBride
      return props.brideName || t.value.defaultBride
    })
    
    // 3D Reel State
    const rotationAngle = ref(0)
    const isDragging = ref(false)
    const startX = ref(0)
    const currentAngleStart = ref(0)
    const radius = ref(480)

    const updateRadius = () => {
      const total = galleryList.value.length || 6
      const isMobile = window.innerWidth < 576
      const isTablet = window.innerWidth < 992

      const frameWidth = isMobile ? 150 : (isTablet ? 190 : 240)
      const calculatedRadius = Math.round((frameWidth / 2) / Math.tan(Math.PI / total))

      if (isMobile) {
        radius.value = Math.max(340, calculatedRadius)
      } else if (isTablet) {
        radius.value = Math.max(420, calculatedRadius)
      } else {
        radius.value = Math.max(520, calculatedRadius)
      }
    }

    onMounted(() => {
      updateRadius()
      window.addEventListener('resize', updateRadius)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateRadius)
    })

    const getFrameStyle = (index) => {
      const total = galleryList.value.length || 1
      const anglePerItem = 360 / total
      const itemAngle = anglePerItem * index

      return {
        transform: `rotateY(${itemAngle}deg) translateZ(${radius.value}px)`
      }
    }

    const startDrag = (e) => {
      isDragging.value = true
      startX.value = e.touches ? e.touches[0].clientX : e.clientX
      currentAngleStart.value = rotationAngle.value
    }

    const onDrag = (e) => {
      if (!isDragging.value) return
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const deltaX = clientX - startX.value
      rotationAngle.value = currentAngleStart.value + deltaX * 0.4
    }

    const stopDrag = () => {
      isDragging.value = false
    }

    const onWheel = (e) => {
      rotationAngle.value -= e.deltaY * 0.15
    }

    const openLightbox = (index) => {
      if (Math.abs(rotationAngle.value - currentAngleStart.value) > 5) return
      selectedImageIndex.value = index
      document.body.style.overflow = 'hidden'
    }

    const closeLightbox = () => {
      selectedImageIndex.value = null
      document.body.style.overflow = ''
    }

    const prevImage = () => {
      if (selectedImageIndex.value === 0) {
        selectedImageIndex.value = galleryList.value.length - 1
      } else {
        selectedImageIndex.value--
      }
    }

    const nextImage = () => {
      if (selectedImageIndex.value === galleryList.value.length - 1) {
        selectedImageIndex.value = 0
      } else {
        selectedImageIndex.value++
      }
    }

    const onImageError = (e) => {
      e.target.style.display = 'none'
    }

    return {
      currentLang,
      t,
      displayGroomName,
      displayBrideName,
      galleryList,
      selectedImageIndex,
      rotationAngle,
      startDrag,
      onDrag,
      stopDrag,
      onWheel,
      getFrameStyle,
      openLightbox,
      closeLightbox,
      prevImage,
      nextImage,
      onImageError
    }
  }
}
</script>

<style scoped>
.gallery-section {
  padding: 60px 0 90px;
  background-color: #121212;
  color: #ffffff;
  width: 100%;
  max-width: 100%;
  overflow-x: clip;
  user-select: none;
}

.gallery-section.ko-font {
  font-family: 'Noto Serif KR', 'Playfair Display', serif;
}

.gallery-container {
  width: 100%;
  max-width: 100%;
  overflow-x: clip;
}

.gallery-header {
  text-align: center;
  margin-bottom: 20px;
  padding: 0 20px;
}

.section-subheading {
  font-size: 0.75rem;
  letter-spacing: 3px;
  color: #c09c5d;
  font-weight: 600;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.couple-title {
  font-family: 'Alex Brush', cursive;
  font-size: 3.6rem;
  color: #fbf9f6;
  font-weight: normal;
  line-height: 1.2;
  margin-bottom: 6px;
}

/* Tối ưu hiển thị font chữ tiếng Hàn cho tên cặp đôi */
.couple-title.ko-font {
  font-family: 'Noto Serif KR', 'Playfair Display', serif;
  font-size: 2.2rem;
  letter-spacing: 1px;
  margin-top: 6px;
  margin-bottom: 10px;
}

.scroll-hint {
  font-size: 0.8rem;
  color: #888888;
  font-style: italic;
}

.scroll-hint.ko-font {
  font-style: normal;
  letter-spacing: 0.5px;
}

/* Viewport 3D */
.reel-viewport {
  width: 100%;
  max-width: 100%;
  height: 500px;
  perspective: 2000px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  position: relative;
  overflow: hidden;
  touch-action: pan-y;
}

.reel-viewport:active {
  cursor: grabbing;
}

.reel-cylinder {
  width: 240px;
  height: 350px;
  position: relative;
  transform-style: preserve-3d;
  will-change: transform;
  transition: transform 0.05s ease-out;
}

.reel-frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #1e1e1e;
  border: 1px solid #333333;
  padding: 8px 8px 10px 8px;
  border-radius: 4px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.7);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  will-change: transform;
  transition: border-color 0.3s ease, filter 0.3s ease;
}

.reel-frame:hover {
  border-color: #c09c5d;
  filter: brightness(1.15);
}

.film-sprockets {
  height: 8px;
  background-image: radial-gradient(#121212 40%, transparent 40%);
  background-size: 12px 8px;
  background-repeat: repeat-x;
  margin: 3px 0;
  opacity: 0.8;
}

.photo-inner {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 2px;
  background-color: #000;
}

.photo-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  pointer-events: none;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  transform: translateZ(0);
}

@media (max-width: 576px) {
  .gallery-section {
    padding: 40px 0 60px;
  }

  .couple-title {
    font-size: 2.8rem;
  }

  .couple-title.ko-font {
    font-size: 1.75rem;
  }

  .reel-viewport {
    height: 380px;
    perspective: 1600px;
  }

  .reel-cylinder {
    width: 150px;
    height: 230px;
  }

  .photo-inner {
    height: 185px;
  }
}
</style>

<!-- Style toàn cục riêng cho Lightbox khi Teleport ra body -->
<style>
.lightbox {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(5px);
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
}

.lightbox-content {
  max-width: 90vw;
  max-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 6px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
}

.lightbox-close {
  position: absolute;
  top: 15px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #ffffff;
  font-size: 2rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000000;
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border: none;
  font-size: 2.2rem;
  width: 46px;
  height: 46px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000000;
}

.lightbox-nav.prev { left: 15px; }
.lightbox-nav.next { right: 15px; }

@media (max-width: 576px) {
  .lightbox-nav {
    width: 38px;
    height: 38px;
    font-size: 1.8rem;
  }
  .lightbox-nav.prev { left: 8px; }
  .lightbox-nav.next { right: 8px; }
  .lightbox-close {
    top: 10px;
    right: 10px;
    width: 38px;
    height: 38px;
  }
}
</style>