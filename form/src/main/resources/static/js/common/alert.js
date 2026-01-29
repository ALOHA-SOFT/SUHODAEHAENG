
// 💎 수호대행 설문 시스템 알림 공통 함수

/**
 * 기본 알림창
 * @param {*} title 
 * @param {*} text 
 * @param {*} icon 
 * @param {*} confirmButtonText 
 */
function $alert(title, text, icon, confirmButtonText = '확인') {
    if (typeof title === 'object') {
        text = title.text;
        icon = title.icon;
        confirmButtonText = title.confirmButtonText ?? confirmButtonText;
        title = title.title;
    }

    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: confirmButtonText,
        customClass: {
            popup: '수호대행-alert'
        }
    });
}

/**
 * 기본 알림창 (콜백 지원)
 * @param {*} title 
 * @param {*} text 
 * @param {*} icon 
 * @param {*} confirmButtonText 
 * @returns Promise
 */
function $alert_(title, text, icon, confirmButtonText = '확인') {
    if (typeof title === 'object') {
        text = title.text;
        icon = title.icon;
        confirmButtonText = title.confirmButtonText ?? confirmButtonText;
        title = title.title;
    }
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: confirmButtonText,
        customClass: {
            popup: '수호대행-alert'
        }
    });
}


/**
 * 기본 confirm 알림창
 * @param {*} title 
 * @param {*} text 
 * @param {*} icon 
 * @param {*} confirmButtonText 
 * @param {*} cancelButtonText 
 * @returns 
 */
function $confirm(title, text, icon, confirmButtonText = '확인', cancelButtonText = '취소', confirmButtonColor = '#007bff', cancelButtonColor = '#6c757d') {
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: confirmButtonColor,
        cancelButtonColor: cancelButtonColor,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        customClass: {
            popup: '수호대행-confirm'
        }
    });
}

/**
 * 3개 버튼 confirm (확인/거부/취소)
 */
function $confirmDeny(title, text, icon, confirmButtonText = '확인', denyButtonText = '거부', cancelButtonText = '취소', confirmButtonColor = '#007bff', denyButtonColor = '#dc3545', cancelButtonColor = '#6c757d') {
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonColor: confirmButtonColor,
        denyButtonColor: denyButtonColor,
        cancelButtonColor: cancelButtonColor,
        confirmButtonText: confirmButtonText,
        denyButtonText: denyButtonText,
        cancelButtonText: cancelButtonText,
        customClass: {
            popup: '수호대행-confirm-deny'
        }
    });
}

/**
 * HTML 지원 confirm
 */
function $confirmHTML(title, html, icon, confirmButtonText = '확인', cancelButtonText = '취소', confirmButtonColor = '#007bff', cancelButtonColor = '#6c757d') {
    return Swal.fire({
        title: title,
        html: html,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: confirmButtonColor,
        cancelButtonColor: cancelButtonColor,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        animation: true,
        customClass: {
            popup: '수호대행-confirm-html'
        }
    });
}

/**
 * 3개 버튼 confirm (확인/거부/취소)
 */
function $confirmDenyHTML(title, html, icon, confirmButtonText = '확인', denyButtonText = '거부', cancelButtonText = '취소', confirmButtonColor = '#007bff', denyButtonColor = '#dc3545', cancelButtonColor = '#6c757d') {
    return Swal.fire({
        title: title,
        html: html,
        icon: icon,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonColor: confirmButtonColor,
        denyButtonColor: denyButtonColor,
        cancelButtonColor: cancelButtonColor,
        confirmButtonText: confirmButtonText,
        denyButtonText: denyButtonText,
        cancelButtonText: cancelButtonText,
        customClass: {
            popup: '수호대행-confirm-deny'
        }
    });
}

/**
 * 기본 토스트
 * @param {*} obj 
 * obj = {
 *  timer: 3000,
 *  title: 'title',
 *  icon: 'success',
 *  position: 'top-end',
 *  showConfirmButton: false,
 *  timerProgressBar: true
 * }
 */
async function $toast(obj = {}) {
    const Toast = Swal.mixin({
        toast: true,
        timer: obj.timer ?? 3000,
        position: obj.position ?? "top-end",
        showConfirmButton: obj.showConfirmButton ?? false,
        timerProgressBar: obj.timerProgressBar ?? true,
        customClass: {
            popup: '수호대행-toast'
        },
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    
    Toast.fire({
        icon: obj.icon ?? "success",
        title: obj.title ?? "success",
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('수호대행 Toast closed by timer');
        }
    });
}

/**
 * 토스트 콜백 지원
 */
function $toast_(obj = {}) {
    const Toast = Swal.mixin({
        toast: true,
        timer: obj.timer ?? 3000,
        position: obj.position ?? "top-end",
        showConfirmButton: obj.showConfirmButton ?? false,
        timerProgressBar: obj.timerProgressBar ?? true,
        customClass: {
            popup: '수호대행-toast'
        },
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    return Toast.fire({
        icon: obj.icon ?? "success",
        title: obj.title ?? "success",
    });
}

// 💎 수호대행 전용 알림 함수들

/**
 * 설문 제출 성공 알림
 */
function alertFormSuccess(message = '설문이 성공적으로 제출되었습니다.') {
    return $alert('🎉 제출 완료', message, 'success');
}

/**
 * 설문 제출 실패 알림
 */
function alertFormError(message = '설문 제출 중 오류가 발생했습니다.') {
    return $alert('❌ 제출 실패', message, 'error');
}

/**
 * 필수 입력 확인 알림
 */
function alertRequired(fieldName = '필수 항목') {
    return $alert('⚠️ 입력 확인', `${fieldName}을(를) 입력해주세요.`, 'warning');
}

/**
 * 설문 삭제 확인
 */
function confirmDeleteForm() {
    return $confirm(
        '🗑️ 설문 삭제', 
        '정말로 이 설문을 삭제하시겠습니까?\n삭제된 설문은 복구할 수 없습니다.', 
        'warning', 
        '삭제', 
        '취소'
    );
}

/**
 * 일정 삭제 확인
 */
function confirmDeleteSchedule() {
    return $confirm(
        '🗑️ 일정 삭제', 
        '정말로 이 일정을 삭제하시겠습니까?', 
        'warning', 
        '삭제', 
        '취소'
    );
}

/**
 * 이메일 발송 성공 토스트
 */
function toastEmailSent() {
    return $toast({
        title: '📧 이메일이 발송되었습니다',
        icon: 'success',
        timer: 2000
    });
}

/**
 * 페이지 이탈 확인
 */
function confirmPageLeave() {
    return $confirm(
        '⚠️ 페이지 이탈', 
        '작성 중인 내용이 저장되지 않을 수 있습니다.\n정말로 페이지를 떠나시겠습니까?', 
        'warning', 
        '이탈', 
        '취소'
    );
}

/**
 * 로딩 알림 표시
 */
function showLoading(message = '처리 중입니다...') {
    return Swal.fire({
        title: message,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
        customClass: {
            popup: '수호대행-loading'
        }
    });
}

/**
 * 로딩 알림 닫기
 */
function hideLoading() {
    Swal.close();
}