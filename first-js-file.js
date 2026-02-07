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
    container.id = 'MyEsGrid';

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
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '15px', // Increased gap to fit the buttons better
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        fontFamily: 'sans-serif'
    });

    const images = document.querySelectorAll(imageSelector);

    images.forEach(img => {
        const lowResUrl = img.src;
        const highResUrl = lowResUrl.replace(thumbURL, imageURL);

        // 1. Create a Cell Wrapper for the image + button
        const cell = document.createElement('div');
        cell.style.textAlign = 'center';

        // 2. Create the Link/Thumbnail
        const link = document.createElement('a');
        link.href = highResUrl;
        link.target = '_blank';

        const thumb = document.createElement('img');
        thumb.src = lowResUrl;
        Object.assign(thumb.style, {
            width: '100%',
            height: 'auto',
            borderRadius: '4px',
            border: '1px solid #ccc',
            display: 'block'
        });

        // 3. Create the "Log" Button
        const logBtn = document.createElement('button');
        logBtn.textContent = 'Copy';
        Object.assign(logBtn.style, {
            marginTop: '5px',
            fontSize: '10px',
            width: '100%',
            cursor: 'pointer',
            padding: '2px 0',
            backgroundColor: '#eee',
            border: '1px solid #999',
            borderRadius: '3px'
        });

        // The Action: console.log the href
        logBtn.onclick = (e) => {
            e.preventDefault(); // Prevents the link from opening if the button is inside
            //copyTextToClipboard(highResUrl);
            copyTextToClipboard(e.previousElementSibling.href);
            showToast('Copied');
        };

        // Assemble the cell
        link.appendChild(thumb);
        cell.appendChild(link);
        cell.appendChild(logBtn);

        container.appendChild(cell);
    });

    if (images.length > 0) {
        document.body.appendChild(container);
    } else {
        console.log("No images found");
    }
}
