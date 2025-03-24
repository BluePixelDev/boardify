import "../dropdown.styles.css";
import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  label: string;
  children: React.ReactNode;
  className?: string
}

export default function Dropdown({ label, children, className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`dropdown ${className ?? ""}`}
      ref={dropdownRef}
    >
      <button onClick={toggleDropdown} className="dropdown__trigger">
        {label}
      </button>
      {isOpen && <div className="dropdown__menu">{children}</div>}
    </div>
  );
}
