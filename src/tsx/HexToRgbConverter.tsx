import React, { useState, useEffect } from "react";
import '../css/HexToRgbConverter.css'


const HexToRgbConverter: React.FC = () => {
    const [hexColor, setHexColor] = useState<string>('#');
    const [rgbColor, setRgbColor] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (hexColor.length === 7) {
            if (/^#[0-9A-Fa-f]{6}$/.test(hexColor)) {
                try {
                    const r = parseInt(hexColor.slice(1, 3), 16);
                    const g = parseInt(hexColor.slice(3, 5), 16);
                    const b = parseInt(hexColor.slice(5, 7), 16);
                    setRgbColor(`rgb (${r}, ${g}, ${b})`);
                    setError('')
                    document.body.style.backgroundColor = hexColor;
                } catch {
                    setError('Ошибка конвертации')
                    document.body.style.backgroundColor = 'red';
                }
            } else {
                setError('Неправильный формат')
                document.body.style.backgroundColor = 'white';
            }
        } else {
            setRgbColor(`rgb (-, -, -)`);
            setError('')
        }
    }, [hexColor]);

    const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 7) {
            setHexColor(value);
        }
    }

    return (
        <div className="everything">
            <div className="input-hex-place">
                <input
                    id="hex-input"
                    className="hex-input"
                    type="text"
                    value={hexColor}
                    onChange={handleHexChange}
                    placeholder="#000000"
                />
            </div>
            <div className="input-rgb-place">
                <div className="rgb-color">{rgbColor}</div>
            </div>
            {error && (
                <div className="error">{error}</div>
            )}
        </div>
    )
}

export default HexToRgbConverter
