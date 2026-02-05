function MyFunc() {
    alert('wonderful4');
}

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard successfully!');
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}

function showToast(message) {
    // 1. Create the element
    const toast = document.createElement('div');
    toast.textContent = message;

    Object.assign(toast.style, {
        position: 'fixed',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%) scale(0.8)',
        backgroundColor: '#d32f2f',
        color: '#ffffff',
        padding: '16px 32px',
        borderRadius: '8px',
        fontSize: '20px',
        fontWeight: 'bold',
        boxShadow: '0px 4px 15px rgba(0,0,0,0.3)',
        opacity: '0',
        transition: 'all 0.4s ease',
        zIndex: '10000',
        textAlign: 'center',
        minWidth: '200px'
    });

    document.body.appendChild(toast);

    // 3. Fade in
    setTimeout(() => { toast.style.opacity = '1' }, 10);

    // 4. Fade out and remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500); // Remove from DOM after fade
    }, 1000);
}

function ExtractGrid(imageSelector, thumbURL, imageURL) {
    // 1. Create the container DIV
    const container = document.createElement('div');

    // 2. Style the container as a Grid
    Object.assign(container.style, {
        position: 'fixed',
        top: '10px',
        right: '10px',
        width: '400px',
        maxHeight: '80vh',
        overflowY: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        border: '2px solid #333',
        padding: '10px',
        zIndex: '10000',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // 3 columns
        gap: '10px',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
    });

    // 3. Find images ending in /270w.jpg
    const images = document.querySelectorAll(imageSelector);

    images.forEach(img => {
        const lowResUrl = img.src;
        // 4. Change 270w.jpg to 1080w.jpg for the href
        const highResUrl = lowResUrl.replace(thumbURL, imageURL);

        // 5. Create the Link
        const link = document.createElement('a');
        link.href = highResUrl;
        link.target = '_blank'; // Open in new tab
        link.style.display = 'block';

        // 6. Create a thumbnail for the link
        const thumb = document.createElement('img');
        thumb.src = lowResUrl;
        Object.assign(thumb.style, {
            width: '100%',
            height: 'auto',
            borderRadius: '4px',
            border: '1px solid #ccc'
        });

        link.appendChild(thumb);
        container.appendChild(link);
    });

    // 7. Append to body
    if (images.length > 0) {
        document.body.appendChild(container);
    } else {
        console.log("No images found");
    }
}
