// Visitor Counter using CountAPI
const NAMESPACE = 'artiwari10-portfolio';
const KEY = 'visitors';

async function updateVisitorCount() {
    try {
        const response = await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`);
        const data = await response.json();
        
        // Update the visitor count display
        const visitsElement = document.getElementById('visits');
        if (visitsElement && data.value) {
            visitsElement.textContent = data.value.toLocaleString();
        }
    } catch (error) {
        console.error('Error updating visitor count:', error);
        // On error, try to at least show the previous count from localStorage
        const previousCount = localStorage.getItem('visitorCount');
        if (previousCount) {
            document.getElementById('visits').textContent = previousCount;
        }
    }
}

// Initialize the counter when the page loads
document.addEventListener('DOMContentLoaded', updateVisitorCount);