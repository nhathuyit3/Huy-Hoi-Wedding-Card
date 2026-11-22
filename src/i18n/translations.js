// src/i18n/translations.js
import { ref, computed } from 'vue'

// Trạng thái ngôn ngữ toàn cục ('vi' hoặc 'ko')
const currentLang = ref('vi')

export const translations = {
  vi: {
    // App.vue
    toggleMusicTitle: 'Bật/Tắt Nhạc',
    langSwitchLabel: '한국어',

    // CoverDoor.vue
    weddingInvitation: 'WEDDING INVITATION',
    openCardTitle: 'Nhấn để mở thiệp',
    scrollToOpen: 'CUỘN ĐỂ MỞ THIỆP',
    defaultLocation: 'ĐÀ NẴNG · VIỆT NAM',

    // HeroSection.vue
    gettingMarried: "WE'RE GETTING MARRIED",
    defaultGroom: 'Nhật Huy',
    defaultBride: 'Bích Khuê',
    dayOfWeek: 'THỨ HAI',
    defaultRestaurant: 'PHI LŨ',
    defaultHall: 'SẢNH PEARL',
    viewVenueBtn: 'XEM ĐỊA ĐIỂM TIỆC',
    cordiallyInvite: 'TRÂN TRỌNG KÍNH MỜI',
    guestPrefix: 'cô / chú / anh / chị / bạn:',
    defaultGuest: 'Quý Khách & Bạn Bè',
    photoAlt: 'Ảnh cưới chú rể & cô dâu',
    countdownSubtitle: 'COUNTDOWN TO THE SPECIAL DAY',
    countdownQuote: 'Cùng Đếm Ngược Thời Gian',
    days: 'NGÀY',
    hours: 'GIỜ',
    minutes: 'PHÚT',
    seconds: 'GIÂY',
    // TimelineSection.vue
    timelineSubheading: 'OUR LOVE STORY',
    timelineHeading: 'Hành Trình Bên Nhau',
    timelineItems: [
      {
        date: '2026',
        title: 'Lần Đầu Gặp Gỡ',
        desc: 'Ánh mắt đầu tiên chạm nhau tại quán cà phê nhỏ ở Đà Nẵng.',
        image: 'assets/images/huy_khue_tim_hieu_img.png'
      },
      {
        date: '2026',
        title: 'Lời Đồng Ý',
        desc: 'Chính thức nắm tay nhau bước vào chặng đường hẹn hò ngọt ngào.',
        image: 'assets/images/huy_khue_to_tinh.png'
      },
      {
        date: '2027',
        title: 'Lời Cầu Hôn',
        desc: '"Đồng ý làm vợ anh nhé!" — Dưới ánh hoàng hôn bờ biển Bà Nà.',
        image: 'assets/images/huy_khue_cau_hon.png'
      }
    ],
    // GallerySection.vue
    gallerySubheading: 'KHOẢNH KHẮC',
    galleryScrollHint: 'Kéo hoặc lăn chuột để xoay cuộn phim 3D',
    galleryFrameAlt: 'Thước phim',
    galleryLightboxAlt: 'Ảnh phóng to'
  },
  ko: {
    // App.vue
    toggleMusicTitle: '배경음악 켜기/끄기',
    langSwitchLabel: 'Tiếng Việt',

    // CoverDoor.vue
    weddingInvitation: '결혼식 초대장',
    openCardTitle: '청첩장을 열려면 클릭하세요',
    scrollToOpen: '청첩장 열기',
    defaultLocation: '다낭 · 베트남',

    // HeroSection.vue
    gettingMarried: '저희 결혼합니다',
    defaultGroom: '녓 후이 (Nhật Huy)',
    defaultBride: '주옌 도 (Bích Khuê)',
    dayOfWeek: '월요일',
    defaultRestaurant: '피루 (PHI LŨ)',
    defaultHall: '펄 홀 (SẢNH PEARL)',
    viewVenueBtn: '예식장 위치 보기',
    cordiallyInvite: '소중한 분들을 초대합니다',
    guestPrefix: '귀하:',
    defaultGuest: '귀빈 및 지인 여러분',
    photoAlt: '신랑 & 신부 웨딩 사진',
    countdownSubtitle: 'COUNTDOWN TO THE SPECIAL DAY',
    countdownQuote: '특별한 날까지 남은 시간',
    days: '일',
    hours: '시간',
    minutes: '분',
    seconds: '초',
    // TimelineSection.vue
    timelineSubheading: 'OUR LOVE STORY',
    timelineHeading: '함께 걸어온 이야기',
    timelineItems: [
      {
        date: '2026',
        title: '첫 만남',
        desc: '다낭의 작은 카페에서 서로의 눈빛이 처음 마주친 순간.',
        image: 'assets/images/huy_khue_tim_hieu_img.png'
      },
      {
        date: '2026',
        title: '사랑의 약속',
        desc: '서로의 손을 꼭 잡고 달콤한 연애의 첫걸음을 함께 내디딘 날.',
        image: 'assets/images/huy_khue_to_tinh.png'
      },
      {
        date: '2027',
        title: '프로포즈',
        desc: '"나와 결혼해 줄래요?" — 바나 해변의 노을 아래 전한 진심.',
        image: 'assets/images/huy_khue_cau_hon.png'
      }
    ],
    // GallerySection.vue
    gallerySubheading: '아름다운 순간',
    galleryScrollHint: '드래그하거나 마우스 휠을 돌려 3D 필름을 회전해 보세요',
    galleryFrameAlt: '웨딩 필름',
    galleryLightboxAlt: '확대 사진'
  }
}

export function useLanguage() {
  const toggleLanguage = () => {
    currentLang.value = currentLang.value === 'vi' ? 'ko' : 'vi'
  }

  const setLanguage = (lang) => {
    if (translations[lang]) {
      currentLang.value = lang
    }
  }

  // Trả về object chứa text tương ứng với ngôn ngữ hiện tại
  const t = computed(() => translations[currentLang.value])

  return {
    currentLang,
    t,
    toggleLanguage,
    setLanguage
  }
}