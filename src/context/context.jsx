
import React, { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SectionContext = createContext();

export const useSectionContext = () => useContext(SectionContext);

export const SectionProvider = ({ children }) => {

    const [sections, setSections] = useState(() => {
        try {
            const stored = localStorage.getItem('formSections');
            return stored ? JSON.parse(stored) : [
                { id: uuidv4(), name: 'Section 1', fields: [] }
            ];
        } catch (e) {
            console.error('Failed to parse stored sections:', e);
            return [{ id: uuidv4(), name: 'Section 1', fields: [] }];
        }
    });

    const addFieldToSection = (sectionId, field) => {
        setSections((prevSections) =>
            prevSections.map((section) =>
                section.id === sectionId
                    ? { ...section, fields: [...section.fields, { ...field, id: uuidv4() }] }
                    : section
            )
        );
    };

    const addSection = (sectionId, fields = []) => {
        setSections((prevSections) => [
            ...prevSections,
            {
                id: sectionId || uuidv4(),
                name: `Section ${prevSections.length + 1}`,
                fields: fields.map((field) => ({ ...field, id: uuidv4() })),
            },
        ]);
    };

    useEffect(() => {
        localStorage.setItem('formSections', JSON.stringify(sections));
        // alert("content Saved successfully")
        console.log("Sections saved to localStorage");
    }, [sections])


    const reorderFields = (sectionId, newFieldOrder) => {
        setSections((prev) =>
            prev.map((sec) =>
                sec.id === sectionId
                    ? { ...sec, fields: newFieldOrder }
                    : sec
            )
        );
    };

    const value = {
        sections,
        setSections,
        addFieldToSection,
        addSection,
        reorderFields,
    };

    return <SectionContext.Provider value={value}>{children}</SectionContext.Provider>;
};
