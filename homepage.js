// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    
    // 현재 재생 중인 버튼을 추적하기 위한 변수
    let currentPlayingButton = null;

    // 플레이 버튼 클릭 이벤트 처리
    function handlePlayButtonClick(button) {
        // 다른 버튼이 재생 중이면 정지
        if (currentPlayingButton && currentPlayingButton !== button) {
            currentPlayingButton.textContent = '▶';
            currentPlayingButton.classList.remove('playing');
        }

        // 현재 버튼 토글
        if (button.textContent === '▶') {
            button.textContent = '⏸';
            button.classList.add('playing');
            currentPlayingButton = button;
            
            // 재생 애니메이션 효과
            button.style.transform = 'scale(1.1)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        } else {
            button.textContent = '▶';
            button.classList.remove('playing');
            currentPlayingButton = null;
        }
    }

    // 모든 플레이 버튼에 이벤트 리스너 추가
    document.querySelectorAll('.play-button, .upload-play, .chart-play').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // 부모 요소로의 이벤트 전파 방지
            handlePlayButtonClick(this);
        });
    });

    // 카드 클릭 이벤트 처리
    document.querySelectorAll('.music-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.card-title').textContent;
            const artist = this.querySelector('.card-artist').textContent;
            console.log(`Playing: ${title} by ${artist}`);
            
            // 카드 내부의 플레이 버튼 자동 클릭
            const playButton = this.querySelector('.play-button');
            if (playButton) {
                handlePlayButtonClick(playButton);
            }
        });
    });

    // 업로드 카드 클릭 이벤트 처리
    document.querySelectorAll('.upload-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.upload-title').textContent;
            const artist = this.querySelector('.upload-artist').textContent;
            console.log(`Playing: ${title} by ${artist}`);
            
            // 카드 내부의 플레이 버튼 자동 클릭
            const playButton = this.querySelector('.upload-play');
            if (playButton) {
                handlePlayButtonClick(playButton);
            }
        });
    });

    // 차트 아이템 클릭 이벤트 처리
    document.querySelectorAll('.chart-item').forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.chart-title').textContent;
            const artist = this.querySelector('.chart-artist').textContent;
            console.log(`Playing: ${title} by ${artist}`);
            
            // 아이템 내부의 플레이 버튼 자동 클릭
            const playButton = this.querySelector('.chart-play');
            if (playButton) {
                handlePlayButtonClick(playButton);
            }
        });
    });

    // 카드 호버 효과 개선
    document.querySelectorAll('.music-card, .upload-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 반응형 그리드 조정 (창 크기 변경 시)
    function adjustGridLayout() {
        const width = window.innerWidth;
        const recommendedGrid = document.querySelector('.recommended-grid');
        const uploadsGrid = document.querySelector('.uploads-grid');
        
        if (width <= 480) {
            // 작은 모바일에서는 2열 고정
            recommendedGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else if (width <= 768) {
            // 모바일에서는 auto-fill 사용
            recommendedGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(160px, 1fr))';
        } else {
            // 태블릿 이상에서는 기본 설정
            recommendedGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
        }
    }

    // 초기 레이아웃 조정
    adjustGridLayout();

    // 창 크기 변경 시 레이아웃 재조정
    window.addEventListener('resize', adjustGridLayout);

    // 스크롤 애니메이션 (선택사항)
    function addScrollAnimation() {
        const cards = document.querySelectorAll('.music-card, .upload-card, .chart-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    // 스크롤 애니메이션 활성화 (선택사항)
    // addScrollAnimation();

    // 키보드 접근성 개선
    document.querySelectorAll('.play-button, .upload-play, .chart-play').forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    console.log('SoundWave homepage loaded successfully!');
});