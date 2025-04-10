import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import '../css/dropzone.css';

const MyDropzone = ({ onImageSelect, initialImage }) => {
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (initialImage) {
            setImagePreview(typeof initialImage === 'string' ? initialImage : URL.createObjectURL(initialImage));
        }
    }, [initialImage])

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0]
            setImagePreview(URL.createObjectURL(file))
            onImageSelect(file)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className='dropzine-div' {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here...</p>
            ) : (
                <p>Drag 'n' drop the product's image.</p>
            )}
            {/* Exibe a pré-visualização da imagem */}
            {imagePreview && (
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ maxWidth: '100px', maxHeight: '200px', objectFit: 'contain' }}
                    />
                </div>
            )}
        </div>
    );
};

export default MyDropzone;