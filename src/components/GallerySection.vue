<template>
  <section class="section gallery-section full-width-section">
    <div class="gallery-container">
      <!-- Tiêu đề Gallery -->
      <div class="gallery-header">
        <p class="section-subheading">KHOẢNH KHẮC</p>
        <h2 class="couple-title">{{ groomName }} &amp; {{ brideName }}</h2>
        <p class="scroll-hint">Kéo hoặc lăn chuột để xoay cuộn phim 3D &circlearrowright;</p>
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
                :alt="'Thước phim ' + (index + 1)"
                loading="eager"
                decoding="sync"
              />
            </div>

            <!-- Lỗ đục phim mép dưới -->
            <div class="film-sprockets bottom"></div>
          </div>
        </div>
      </div>

      <!-- Lightbox phóng to ảnh -->
      <div v-if="selectedImageIndex !== null" class="lightbox" @click="closeLightbox">
        <button class="lightbox-close" @click.stop="closeLightbox">&times;</button>
        <button class="lightbox-nav prev" @click.stop="prevImage">&lsaquo;</button>
        
        <div class="lightbox-content" @click.stop>
          <img :src="galleryList[selectedImageIndex]" alt="Ảnh phóng to" />
        </div>

        <button class="lightbox-nav next" @click.stop="nextImage">&rsaquo;</button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'

export default {
  name: 'GallerySection',
  props: {
    gallery: {
      type: Array,
      default: () => []
    },
    groomName: {
      type: String,
      default: 'Nhật Huy'
    },
    brideName: {
      type: String,
      default: 'Duyên Đỗ'
    }
  },
  setup(props) {
    const galleryList = computed(() => props.gallery)
    const selectedImageIndex = ref(null)
    
    // 3D Reel State
    const rotationAngle = ref(0)
    const isDragging = ref(false)
    const startX = ref(0)
    const currentAngleStart = ref(0)
    const radius = ref(480)

    // TÍNH TOÁN RADIUS THÔNG MINH THEO SỐ LƯỢNG ẢNH ĐỂ KHÔNG BỊ CHỒNG/CẮM VÀO NHAU
    const updateRadius = () => {
      const total = galleryList.value.length || 6
      const isMobile = window.innerWidth < 576
      const isTablet = window.innerWidth < 992

      // Độ rộng ước tính của 1 khung hình (px)
      const frameWidth = isMobile ? 150 : (isTablet ? 190 : 240)
      
      // Bán kính tối thiểu cần có dựa trên đường tròn toán học: R = (w / 2) / tan(PI / N)
      const calculatedRadius = Math.round((frameWidth / 2) / Math.tan(Math.PI / total))

      if (isMobile) {
        // Trên di động, đảm bảo bán kính đủ lớn (tối thiểu 340px) để các ảnh đứng tách rời
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
      if (Math.abs(rotationAngle.value - currentAngleStart.value) > 2) return
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

    return {
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
      nextImage
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
  overflow: hidden;
  user-select: none;
}

.gallery-container {
  width: 100%;
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

.scroll-hint {
  font-size: 0.8rem;
  color: #888888;
  font-style: italic;
}

/* Viewport 3D */
.reel-viewport {
  width: 100%;
  height: 500px;
  perspective: 2000px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  position: relative;
}

.reel-viewport:active {
  cursor: grabbing;
}

/* Trục xoay cuộn phim */
.reel-cylinder {
  width: 240px;
  height: 350px;
  position: relative;
  transform-style: preserve-3d;
  will-change: transform;
  transition: transform 0.05s ease-out;
}

/* Khung ảnh trên cuộn phim */
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

/* Lightbox Modal */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-content {
  max-width: 90vw;
  max-height: 85vh;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 85vh;
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 25px;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 2.5rem;
  cursor: pointer;
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  border: none;
  font-size: 3rem;
  padding: 10px 18px;
  cursor: pointer;
  border-radius: 4px;
}

.lightbox-nav.prev { left: 20px; }
.lightbox-nav.next { right: 20px; }

/* OPTIMIZE CHUẨN XÁC CHO THIẾT BỊ DI ĐỘNG (MOBILE) */
@media (max-width: 576px) {
  .gallery-section {
    padding: 40px 0 60px;
  }

  .couple-title {
    font-size: 2.8rem;
  }

  .reel-viewport {
    height: 380px;
    perspective: 1600px; /* Tăng góc nhìn 3D để giảm góc ép dẹp trên màn nhỏ */
  }

  /* Thu gọn độ rộng khung hình giúp tạo khoảng trống lớn giữa các ảnh */
  .reel-cylinder {
    width: 150px;
    height: 230px;
  }

  .photo-inner {
    height: 185px;
  }
}
</style>