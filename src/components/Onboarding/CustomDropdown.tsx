import { useState, useRef, useEffect, useCallback } from 'react';
import type { UserEstado } from '../../context/UserContext';

interface DropdownOption {
  value: UserEstado;
  label: string;
}

const OPTIONS: DropdownOption[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'embarazada', label: 'Embarazada' },
  { value: 'adulto_mayor', label: 'Adulto mayor' },
  { value: 'discapacitado/a', label: 'Discapacitado/a' },
];

interface CustomDropdownProps {
  value: UserEstado | null;
  onChange: (estado: UserEstado) => void;
}

export function CustomDropdown({ value, onChange }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedOption = OPTIONS.find((o) => o.value === value) ?? null;

  const close = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, close]);

  const handleSelect = (option: DropdownOption) => {
    onChange(option.value);
    close();
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Seleccionar estado"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between"
        style={{
          background: 'transparent',
          border: 'none',
          borderBottom: `1px solid ${isOpen ? '#3B82F6' : '#1E1E24'}`,
          padding: '10px 0',
          fontSize: '14px',
          fontWeight: 300,
          color: selectedOption ? '#EDEDED' : '#2A2A32',
          cursor: 'pointer',
          outline: 'none',
          transition: 'border-color 200ms',
          fontFamily: 'inherit',
        }}
      >
        <span>{selectedOption ? selectedOption.label : 'Seleccionar opción'}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 200ms ease',
            flexShrink: 0,
          }}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="#4B5563"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="Opciones de estado"
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            zIndex: 100,
            background: '#16161C',
            border: '1px solid #2A2A38',
            borderRadius: '8px',
            boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            overflow: 'hidden',
            animation: 'dropdownOpen 200ms ease both',
          }}
        >
          {OPTIONS.map((option, index) => {
            const isSelected = value === option.value;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                tabIndex={0}
                onClick={() => handleSelect(option)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(option);
                  }
                }}
                className="flex cursor-pointer items-center justify-between"
                style={{
                  padding: '12px 16px',
                  fontSize: '13px',
                  fontWeight: 300,
                  color: isSelected ? '#EDEDED' : '#9CA3AF',
                  borderBottom: index < OPTIONS.length - 1 ? '1px solid #1E1E24' : 'none',
                  transition: 'background 150ms, color 150ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(59,130,246,0.06)';
                  e.currentTarget.style.color = '#EDEDED';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = isSelected ? '#EDEDED' : '#9CA3AF';
                }}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <span
                    aria-hidden="true"
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#3B82F6',
                      flexShrink: 0,
                    }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
