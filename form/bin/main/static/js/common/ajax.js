// 💎 수호파트너스 설문 시스템 AJAX 공통 함수
async function $ajax(obj) {
    console.log('수호파트너스 AJAX Call:', {
        url: obj.url,
        type: obj.type,
        data: obj.data
    });
    
    try {
        // 💎 CSRF TOKEN 자동 처리
        const csrfToken = document.querySelector('meta[name="_csrf"]')?.getAttribute('content');
        const csrfHeader = document.querySelector('meta[name="_csrf_header"]')?.getAttribute('content');

        let data;
        if (obj.type === 'GET' || obj.type === 'DELETE') { 
            data = obj.data; 
        } else { 
            data = obj.data instanceof FormData ? obj.data : JSON.stringify(obj.data);
        }

        let response = await $.ajax({
            beforeSend: function(xhr) {
                if (csrfToken && csrfHeader) {
                    xhr.setRequestHeader(csrfHeader, csrfToken);
                }
            },
            url: obj.url,
            type: obj.type,
            data: data,
            contentType: obj.data instanceof FormData ? false : 'application/json; charset=utf-8',
            processData: obj.data instanceof FormData ? false : true,
            timeout: 30000, // 30초 타임아웃
        });
        
        console.log('수호파트너스 AJAX Success:', response);
        return response;
    } catch (error) {
        console.error('수호파트너스 AJAX Error:', error);
        
        // 에러 타입별 처리
        if (error.status === 400) {
            console.error('잘못된 요청 (400)');
        } else if (error.status === 401) {
            console.error('인증 실패 (401)');
        } else if (error.status === 403) {
            console.error('권한 없음 (403)');
        } else if (error.status === 404) {
            console.error('페이지를 찾을 수 없음 (404)');
        } else if (error.status === 500) {
            console.error('서버 오류 (500)');
        }
        
        return "FAIL";
    }   
}

// 💎 설문 전용 API 호출 함수
async function formsAjax(endpoint, method = 'GET', data = null) {
    return await $ajax({
        url: `/api/forms${endpoint}`,
        type: method,
        data: data
    });
}

// 💎 스케줄 전용 API 호출 함수
async function schedulesAjax(endpoint, method = 'GET', data = null) {
    return await $ajax({
        url: `/api/schedules${endpoint}`,
        type: method,
        data: data
    });
}

// 💎 파일 업로드 전용 함수
async function uploadFile(file, uploadUrl = '/api/upload') {
    const formData = new FormData();
    formData.append('file', file);
    
    return await $ajax({
        url: uploadUrl,
        type: 'POST',
        data: formData
    });
}

// 💎 페이지네이션 데이터 로드 함수
async function loadPageData(url, page = 1, size = 10, filters = {}) {
    const params = new URLSearchParams({
        page: page,
        size: size,
        ...filters
    });
    
    return await $ajax({
        url: `${url}?${params.toString()}`,
        type: 'GET'
    });
}