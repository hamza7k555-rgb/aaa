// Live Stats Animation
async function fetchLiveStats() {
    try {
        const response = await fetch('/client/api/analytics/overall', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-Requested-Origin': window.location.origin
            }
        });
        if (!response.ok) return null;
        return await response.json();
    } catch (err) {
        console.error('Failed to fetch live stats:', err);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Function to animate counting up
    function animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        if (!obj) return;
        
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Handle different formats
            if (id === 'uptime') {
                obj.innerHTML = (start + (progress * (end - start))).toFixed(1) + '%';
            } else if (end > 1000) {
                // For large numbers, use comma formatting and add + at the end
                const value = Math.floor(start + (progress * (end - start)));
                obj.innerHTML = value.toLocaleString() + '+';
            } else {
                obj.innerHTML = Math.floor(start + (progress * (end - start)));
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Intersection Observer to trigger animations when stats are visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(async entry => {
            if (entry.isIntersecting) {
                // Fetch live stats from API
                const stats = await fetchLiveStats();
                // Use API data if available, otherwise fallback to defaults
                const activeServers = stats && stats.total_running_containers !== undefined ? stats.total_running_containers : 3000;
                const totalUsers = stats && stats.total_users !== undefined ? stats.total_users : 100000;
                // You can add more fields if your API provides them
                setTimeout(() => {
                    animateValue('active-servers', 0, activeServers, 2000);
                    animateValue('total-users', 0, totalUsers, 2500);
                    animateValue('total-servers', 0, 170000, 2500);
                    animateValue('uptime', 0, 99.9, 2000);
                }, 300);
                // Unobserve after triggering
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe the stats section
    const statsSection = document.querySelector('.live-stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
});