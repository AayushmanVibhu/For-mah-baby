/* ═══════════════════════════════════════════════════════════════
   💕 SUPER CUTE VALENTINE WEBSITE - INTERACTIVE FEATURES 💕
   ═══════════════════════════════════════════════════════════════ */

// ────────────────────────────────────────────────────────────────
// INITIALIZE ON PAGE LOAD
// ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
    // Start floating hearts animation
    createFloatingHearts();
    
    // Setup music toggle if audio exists
    setupMusicToggle();
    
    // Auto-fill certificate date on hellyes page
    fillCertificateDate();
    
    // Initialize confetti canvas
    initConfettiCanvas();
    
    // Initialize heart burst canvas
    initHeartBurstCanvas();
});

// ────────────────────────────────────────────────────────────────
// FLOATING HEARTS BACKGROUND
// ────────────────────────────────────────────────────────────────
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    if (!container) return;
    
    const heartEmojis = ['💕', '💖', '💗', '💝', '💓', '❤️', '💘'];
    
    // Create 10 floating hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            addFloatingHeart(container, heartEmojis);
        }, i * 800); // Stagger the creation
    }
    
    // Continue adding hearts periodically
    setInterval(() => {
        addFloatingHeart(container, heartEmojis);
    }, 3000);
}

function addFloatingHeart(container, heartEmojis) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, 10000);
}

// ────────────────────────────────────────────────────────────────
// MUSIC TOGGLE
// ────────────────────────────────────────────────────────────────
function setupMusicToggle() {
    const music = document.getElementById('bgMusic');
    const toggle = document.getElementById('musicToggle');
    const btn = document.getElementById('musicBtn');
    const icon = document.getElementById('musicIcon');
    const text = document.getElementById('musicText');
    
    if (!music || !toggle) return;
    
    // Show toggle if music exists
    toggle.style.display = 'block';
    
    let isPlaying = false;
    
    btn.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            icon.textContent = '🎵';
            text.textContent = 'Music Off';
            isPlaying = false;
        } else {
            music.play();
            icon.textContent = '🎶';
            text.textContent = 'Music On';
            isPlaying = true;
        }
    });
}

// ────────────────────────────────────────────────────────────────
// ANSWER BUTTON HANDLERS (Index Page)
// ────────────────────────────────────────────────────────────────
function handleAnswer(answer) {
    // Play pop sound
    playPopSound();
    
    // Trigger confetti
    triggerConfetti();
    
    // Navigate after a short delay
    setTimeout(() => {
        if (answer === 'yes' || answer === 'hellyes') {
            // Both Yes and Hell Yes go to certificate page
            window.location.href = 'hellyes.html';
        } else if (answer === 'kissi') {
            window.location.href = 'kissi.html';
        }
    }, 800);
}

// ────────────────────────────────────────────────────────────────
// POP SOUND (Generated with Web Audio API)
// ────────────────────────────────────────────────────────────────
function playPopSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Silent fail if Web Audio API not supported
        console.log('Audio not supported');
    }
}

// ────────────────────────────────────────────────────────────────
// CONFETTI ANIMATION
// ────────────────────────────────────────────────────────────────
let confettiCanvas, confettiCtx;

function initConfettiCanvas() {
    confettiCanvas = document.getElementById('confettiCanvas');
    if (!confettiCanvas) return;
    
    confettiCtx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    });
}

function triggerConfetti() {
    if (!confettiCanvas || !confettiCtx) return;
    
    const confettiCount = 100;
    const confettiPieces = [];
    const colors = ['#FF6B9D', '#FFB3C6', '#FF8FAB', '#FFC2D1', '#FF85A2'];
    
    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push({
            x: Math.random() * confettiCanvas.width,
            y: -10,
            size: Math.random() * 8 + 4,
            speedX: Math.random() * 4 - 2,
            speedY: Math.random() * 5 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }
    
    // Animate confetti
    function animateConfetti() {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        
        let stillFalling = false;
        
        confettiPieces.forEach((piece, index) => {
            piece.y += piece.speedY;
            piece.x += piece.speedX;
            piece.rotation += piece.rotationSpeed;
            piece.speedY += 0.1; // Gravity
            
            confettiCtx.save();
            confettiCtx.translate(piece.x, piece.y);
            confettiCtx.rotate(piece.rotation * Math.PI / 180);
            confettiCtx.fillStyle = piece.color;
            confettiCtx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
            confettiCtx.restore();
            
            if (piece.y < confettiCanvas.height + 10) {
                stillFalling = true;
            }
        });
        
        if (stillFalling) {
            requestAnimationFrame(animateConfetti);
        } else {
            // Clear canvas when animation is done
            confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        }
    }
    
    animateConfetti();
}

// ────────────────────────────────────────────────────────────────
// ACCORDION FUNCTIONALITY (Yes Page)
// ────────────────────────────────────────────────────────────────
function toggleAccordion(button) {
    const item = button.parentElement;
    const wasActive = item.classList.contains('active');
    
    // Close all accordion items
    document.querySelectorAll('.accordion-item').forEach(el => {
        el.classList.remove('active');
    });
    
    // Open clicked item if it wasn't already open
    if (!wasActive) {
        item.classList.add('active');
    }
}

// ────────────────────────────────────────────────────────────────
// CERTIFICATE DATE AUTO-FILL (Hell Yes Page)
// ────────────────────────────────────────────────────────────────
function fillCertificateDate() {
    const dateElement = document.getElementById('certificateDate');
    if (!dateElement) return;
    
    // Set to our special date: 14th February 2026
    dateElement.textContent = 'February 14, 2026';
}

// ────────────────────────────────────────────────────────────────
// SURPRISE REVEAL (Hell Yes Page)
// ────────────────────────────────────────────────────────────────
function revealSurprise() {
    const hiddenMessage = document.getElementById('hiddenMessage');
    const surpriseBtn = document.getElementById('surpriseBtn');
    
    if (!hiddenMessage) return;
    
    // Hide button
    surpriseBtn.style.display = 'none';
    
    // Reveal message
    hiddenMessage.classList.add('revealed');
    
    // Trigger heart burst
    triggerHeartBurst();
    
    // Play pop sound
    playPopSound();
}

// ────────────────────────────────────────────────────────────────
// HEART BURST ANIMATION
// ────────────────────────────────────────────────────────────────
let heartBurstCanvas, heartBurstCtx;

function initHeartBurstCanvas() {
    heartBurstCanvas = document.getElementById('heartBurstCanvas');
    if (!heartBurstCanvas) return;
    
    heartBurstCtx = heartBurstCanvas.getContext('2d');
    heartBurstCanvas.width = window.innerWidth;
    heartBurstCanvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        heartBurstCanvas.width = window.innerWidth;
        heartBurstCanvas.height = window.innerHeight;
    });
}

function triggerHeartBurst() {
    if (!heartBurstCanvas || !heartBurstCtx) return;
    
    const heartCount = 30;
    const hearts = [];
    const heartEmojis = ['💕', '💖', '💗', '💝', '💓', '❤️', '💘'];
    
    const centerX = heartBurstCanvas.width / 2;
    const centerY = heartBurstCanvas.height / 2;
    
    // Create heart particles
    for (let i = 0; i < heartCount; i++) {
        const angle = (Math.PI * 2 * i) / heartCount;
        hearts.push({
            x: centerX,
            y: centerY,
            vx: Math.cos(angle) * (Math.random() * 3 + 2),
            vy: Math.sin(angle) * (Math.random() * 3 + 2),
            emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
            size: Math.random() * 20 + 20,
            life: 1.0
        });
    }
    
    // Animate hearts
    function animateHearts() {
        heartBurstCtx.clearRect(0, 0, heartBurstCanvas.width, heartBurstCanvas.height);
        
        let stillAlive = false;
        
        hearts.forEach(heart => {
            heart.x += heart.vx;
            heart.y += heart.vy;
            heart.vy += 0.1; // Gravity
            heart.life -= 0.01;
            
            if (heart.life > 0) {
                heartBurstCtx.save();
                heartBurstCtx.globalAlpha = heart.life;
                heartBurstCtx.font = heart.size + 'px Arial';
                heartBurstCtx.fillText(heart.emoji, heart.x, heart.y);
                heartBurstCtx.restore();
                stillAlive = true;
            }
        });
        
        if (stillAlive) {
            requestAnimationFrame(animateHearts);
        } else {
            heartBurstCtx.clearRect(0, 0, heartBurstCanvas.width, heartBurstCanvas.height);
        }
    }
    
    animateHearts();
}

// ────────────────────────────────────────────────────────────────
// UTILITY: Smooth Scroll (if needed)
// ────────────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ────────────────────────────────────────────────────────────────
// IMAGE MODAL / LIGHTBOX
// ────────────────────────────────────────────────────────────────
function openImageModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    if (modal && modalImg) {
        modal.classList.add('active');
        modalImg.src = imageSrc;
        
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    
    if (modal) {
        modal.classList.remove('active');
        
        // Re-enable body scrolling
        document.body.style.overflow = 'auto';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
});

/* ═══════════════════════════════════════════════════════════════
   END OF INTERACTIVE FEATURES
   Keep this file clean and well-commented for easy customization!
   ═══════════════════════════════════════════════════════════════ */
