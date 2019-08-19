import React, { useState } from 'react';

const MainPage = () => {
    const [status, setStatus] = useState('Drop Here');
    const [percentage, setPercentage] = useState(0);
    const [preview, setPreview] = useState(null);
    const [enableDragDrop, setEnableDragDrop] = useState(true);
    const doNothing = event => event.preventDefault();
    
    const onDragEnter = event => {
        console.log(event);
        if (enableDragDrop) {
            setStatus('File Detected');
        }
        event.preventDefault();
        event.stopPropagation();
    }

    const onDragLeave = event => {
        if (enableDragDrop) {
            setStatus('Drop Here');
        }
        event.preventDefault();
    }

    const onDragOver = event => {
        if (enableDragDrop) {
            setStatus('Drop');
        }
        event.preventDefault();
    }

    const onDrop = event => {
        console.log(event);
        const supportedFilesTypes = ['image/jpeg', 'image/png'];
        const { type } = event.dataTransfer.files[0];
        if (supportedFilesTypes.indexOf(type) > -1 && enableDragDrop) {
            const reader = new FileReader();
            reader.onload = e => setPreview(e.target.result);
            reader.readAsDataURL(event.dataTransfer.files[0]);

            // Create Form Data
            const payload = new FormData();
            payload.append('file', event.dataTransfer.files[0]);
            // XHR - New XHR Request
            const xhr = new XMLHttpRequest();
            // XHR - Upload Progress
            xhr.upload.onprogress = (e) => {
                const done = e.position || e.loaded
                const total = e.totalSize || e.total;
                const perc = (Math.floor(done/total*1000)/10);
                if (perc >= 100) {
                    setStatus('Done');
                    setTimeout(() => {
                        setPreview(null);
                        setStatus('Drop Here');
                        setPercentage(0);
                        setEnableDragDrop(true);
                    }, 750); // To match the transition 500 / 250
                } else {
                    setStatus(`${perc}%`);
                }
                setPercentage(perc); 
            };
            // XHR - Make Request  
            xhr.open('POST', 'http://localhost:5000/upload');
            xhr.send(payload);
            setEnableDragDrop(false);
        }
        event.preventDefault();
    }

    return (
        <div 
            className="App" 
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={doNothing} 
            onDrop={onDragLeave}
        >
            <div className={`ImagePreview ${preview ? 'Show' : ''}`}>
            <div style={{ backgroundImage: `url(${preview})` }}></div>
        </div>
        <div className={`DropArea ${status === 'Drop' ? 'Over' : ''}`} onDragOver={onDragOver} onDragLeave={onDragEnter} onDrop={onDrop}>
            <div className={`ImageProgress ${preview ? 'Show' : ''}`}>
                <div className="ImageProgressImage" style={{ backgroundImage: `url(${preview})` }}></div>
                <div 
                    className="ImageProgressUploaded" 
                    style={{ 
                        backgroundImage: `url(${preview})`, 
                        clipPath: `inset(${100 - Number(percentage)}% 0 0 0);` 
                    }}>
                </div>
            </div>
                <div 
                    className={`Status ${status.indexOf('%') > -1 || status === 'Done' ? 'Uploading' : ''}`}
                >
                    {status}
                </div> 
            </div> 
        </div> 
    );
};
export default MainPage;