<template>
  <section class="section rsvp-section full-width-section">
    <div class="rsvp-container">
      <!-- Khung thiệp sang trọng bọc ngoài -->
      <div class="luxury-card">
        <!-- Họa tiết trang trí 4 góc thiệp -->
        <div class="corner-ornament top-left"></div>
        <div class="corner-ornament top-right"></div>
        <div class="corner-ornament bottom-left"></div>
        <div class="corner-ornament bottom-right"></div>

        <p class="section-subheading">XÁC NHẬN THAM DỰ &amp; LỜI CHÚC</p>
        <h2 class="section-title">Gửi Lời Chúc Mừng</h2>
        
        <div class="divider-gold">
          <span class="diamond">◆</span>
        </div>

        <p class="rsvp-desc">
          Sự hiện diện của bạn là niềm hạnh phúc lớn nhất của chúng mình.<br />
          Vui lòng xác nhận tham dự trước ngày <strong>20.07.2026</strong> để gia đình chuẩn bị đón tiếp chu đáo nhất!
        </p>

        <form @submit.prevent="submitRsvp" class="rsvp-form">
          <!-- HỌ VÀ TÊN -->
          <div class="form-group">
            <label for="name">Họ và tên <span class="required">*</span></label>
            <input 
              type="text" 
              id="name" 
              v-model="formData.name" 
              placeholder="Nhập họ và tên của bạn" 
              required 
            />
          </div>

          <!-- SỐ ĐIỆN THOẠI -->
          <div class="form-group">
            <label for="phone">Số điện thoại</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="formData.phone" 
              placeholder="Nhập số điện thoại (không bắt buộc)" 
            />
          </div>

          <!-- XÁC NHẬN THAM DỰ -->
          <div class="form-group">
            <label>Bạn sẽ đến chung vui chứ? <span class="required">*</span></label>
            <div class="radio-group">
              <label class="radio-label" :class="{ active: formData.attendance === 'Có, tôi sẽ đến' }">
                <input type="radio" value="Có, tôi sẽ đến" v-model="formData.attendance" />
                <span class="custom-radio"></span>
                <span>Chắc chắn sẽ đến</span>
              </label>
              <label class="radio-label" :class="{ active: formData.attendance === 'Rất tiếc không thể đến' }">
                <input type="radio" value="Rất tiếc không thể đến" v-model="formData.attendance" />
                <span class="custom-radio"></span>
                <span>Rất tiếc không thể đến</span>
              </label>
            </div>
          </div>

          <!-- SỐ LƯỢNG THAM GIA -->
          <div class="form-group" v-if="formData.attendance === 'Có, tôi sẽ đến'">
            <label for="guests">Số lượng người tham dự</label>
            <div class="select-wrapper">
              <select id="guests" v-model="formData.guests">
                <option :value="1">1 người (Đi một mình)</option>
                <option :value="2">2 người (Đi cùng người thân/bạn)</option>
                <option :value="3">3 người</option>
                <option :value="4">4 người (Cả gia đình)</option>
              </select>
            </div>
          </div>

          <!-- LỜI CHÚC -->
          <div class="form-group">
            <label for="message">Lời chúc dành cho Cô dâu &amp; Chú rể</label>
            <textarea 
              id="message" 
              v-model="formData.message" 
              rows="4" 
              placeholder="Nhập những lời chúc thân thương dành cho cặp đôi..."
            ></textarea>
          </div>

          <!-- NÚT GỬI -->
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <span v-if="!isSubmitting">GỬI XÁC NHẬN &amp; LỜI CHÚC</span>
            <span v-else class="loading-text">Đang gửi...</span>
          </button>

          <!-- THÔNG BÁO TRẠNG THÁI -->
          <p v-if="submitStatus === 'success'" class="status-msg success">
            ✨ Cảm ơn bạn! Thông tin và lời chúc đã được gửi thành công.
          </p>
          <p v-if="submitStatus === 'error'" class="status-msg error">
            ❌ Có lỗi xảy ra, vui lòng thử lại sau ít phút!
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'RsvpSection',
  props: {
    guestName: {
      type: String,
      default: ''
    },
    // Dán Web App URL thu được từ Google Apps Script vào đây
    scriptUrl: {
      type: String,
      default: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec' 
    }
  },
  setup(props) {
    const formData = ref({
      name: props.guestName || '',
      phone: '',
      attendance: 'Có, tôi sẽ đến',
      guests: 1,
      message: ''
    })

    // Tự động điền tên nếu người dùng truy cập từ URL ?to=Tên
    watch(() => props.guestName, (newVal) => {
      if (newVal) formData.value.name = newVal
    })

    const isSubmitting = ref(false)
    const submitStatus = ref('')

    const submitRsvp = async () => {
      if (!props.scriptUrl || props.scriptUrl.includes('YOUR_SCRIPT_ID_HERE')) {
        alert('Vui lòng cấu hình scriptUrl từ Google Apps Script!')
        return
      }

      isSubmitting.value = true
      submitStatus.value = ''

      try {
        await fetch(props.scriptUrl, {
          method: 'POST',
          mode: 'no-cors', // Sử dụng no-cors để gửi dữ liệu mượt mà từ GitHub Pages
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData.value)
        })

        submitStatus.value = 'success'
        // Reset bớt các trường
        formData.value.phone = ''
        formData.value.message = ''
      } catch (error) {
        console.error('Lỗi khi gửi RSVP:', error)
        submitStatus.value = 'error'
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      formData,
      isSubmitting,
      submitStatus,
      submitRsvp
    }
  }
}
</script>

<style scoped>
.rsvp-section {
  padding: 90px 20px;
  background-color: #fbf9f6;
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.015) 1px, transparent 1px);
  background-size: 24px 24px;
  color: #333333;
  display: flex;
  justify-content: center;
}

.rsvp-container {
  max-width: 680px;
  width: 100%;
}

/* KHUNG THIỆP SANG TRỌNG HOÀNG GIA */
.luxury-card {
  position: relative;
  background: #ffffff;
  padding: 55px 45px;
  border-radius: 4px;
  border: 1px solid #e0d7c6;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.04);
  text-align: center;
}

/* HỌA TIẾT 4 GÓC KHUNG THIỆP */
.corner-ornament {
  position: absolute;
  width: 18px;
  height: 18px;
  border-color: #c09c5d;
  border-style: solid;
  pointer-events: none;
}
.top-left { top: 12px; left: 12px; border-width: 2px 0 0 2px; }
.top-right { top: 12px; right: 12px; border-width: 2px 2px 0 0; }
.bottom-left { bottom: 12px; left: 12px; border-width: 0 0 2px 2px; }
.bottom-right { bottom: 12px; right: 12px; border-width: 0 2px 2px 0; }

/* TIÊU ĐỀ */
.section-subheading {
  font-size: 0.78rem;
  letter-spacing: 3px;
  color: #888888;
  font-weight: 600;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.section-title {
  font-family: 'Alex Brush', 'Dancing Script', cursive;
  font-size: 3.6rem;
  color: #a32a29;
  font-weight: normal;
  margin: 0;
  line-height: 1.1;
}

/* ĐƯỜNG PHÂN CÁCH MẠ VÀNG */
.divider-gold {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0 20px;
}

.divider-gold::before,
.divider-gold::after {
  content: '';
  width: 50px;
  height: 1px;
  background-color: #c09c5d;
  opacity: 0.5;
}

.divider-gold .diamond {
  color: #c09c5d;
  font-size: 0.6rem;
  padding: 0 10px;
}

.rsvp-desc {
  font-size: 0.92rem;
  color: #555555;
  line-height: 1.6;
  margin-bottom: 35px;
}

.rsvp-desc strong {
  color: #a32a29;
}

/* STYLING FORM FORMAL & SANG TRỌNG */
.rsvp-form {
  text-align: left;
}

.form-group {
  margin-bottom: 22px;
}

.form-group label {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  color: #333333;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.required {
  color: #a32a29;
}

/* INPUT & TEXTAREA */
input[type="text"],
input[type="tel"],
select,
textarea {
  width: 100%;
  padding: 13px 16px;
  border: 1px solid #dcd3c5;
  border-radius: 3px;
  font-size: 0.92rem;
  font-family: inherit;
  box-sizing: border-box;
  background: #ffffff;
  color: #222222;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input[type="text"]:focus,
input[type="tel"]:focus,
select:focus,
textarea:focus {
  border-color: #c09c5d;
  box-shadow: 0 0 0 3px rgba(192, 156, 93, 0.12);
}

/* SELECT WRAPPER */
.select-wrapper {
  position: relative;
}

/* RADIO BUTTON CARDS XEN KẼ */
.radio-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 6px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.88rem;
  font-weight: 600;
  color: #444444;
  cursor: pointer;
  padding: 12px 14px;
  border: 1px solid #dcd3c5;
  border-radius: 3px;
  background-color: #ffffff;
  transition: all 0.3s ease;
}

.radio-label input[type="radio"] {
  display: none;
}

.custom-radio {
  width: 16px;
  height: 16px;
  border: 1px solid #ccc;
  border-radius: 50%;
  position: relative;
  flex-shrink: 0;
  transition: border-color 0.3s ease;
}

.radio-label.active {
  border-color: #c09c5d;
  background-color: #faf7f2;
  color: #222222;
}

.radio-label.active .custom-radio {
  border-color: #c09c5d;
}

.radio-label.active .custom-radio::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #c09c5d;
}

textarea {
  resize: vertical;
}

/* NÚT SUBMIT ĐỎ ĐÔ HOÀNG GIA */
.submit-btn {
  width: 100%;
  padding: 15px;
  background-color: #a32a29;
  color: #ffffff;
  border: none;
  border-radius: 3px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 2px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 10px;
  box-shadow: 0 4px 12px rgba(163, 42, 41, 0.25);
}

.submit-btn:hover {
  background-color: #87201f;
  transform: translateY(-1px);
}

.submit-btn:disabled {
  background-color: #cccccc;
  box-shadow: none;
  cursor: not-allowed;
}

/* TRẠNG THÁI GỬI */
.status-msg {
  margin-top: 20px;
  padding: 12px;
  border-radius: 3px;
  font-size: 0.9rem;
  text-align: center;
  font-weight: 600;
}

.status-msg.success {
  color: #2e7d32;
  background-color: #edf7ed;
  border: 1px solid #c8e6c9;
}

.status-msg.error {
  color: #c62828;
  background-color: #fdeded;
  border: 1px solid #ffcdd2;
}

/* RESPONSIVE DI ĐỘNG */
@media (max-width: 576px) {
  .luxury-card {
    padding: 35px 20px;
  }

  .section-title {
    font-size: 3rem;
  }

  .radio-group {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
</style>