import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type CollapsibleSectionProps = {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
};

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children, isOpen, onToggle }) => {
    return (
        <>
            <TouchableOpacity onPress={onToggle} className="flex-row justify-between items-center bg-[#D8C9A5] rounded-xl px-4 py-3">
                <Text className="text-lg font-semibold text-[#101820]">{title}</Text>
                <Text className="text-xl font-bold text-[#101820]">{isOpen ? "−" : "+"}</Text>
            </TouchableOpacity>
            {isOpen && <View className="mt-4">{children}</View>}
        </>
    );
};

type AccordionProps = {
    sections: { title: string; content: React.ReactNode }[];
};

export const Accordion: React.FC<AccordionProps> = ({ sections }) => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <View>
            {sections.map((section, index) => (
                <View key={index} className="mb-4">
                    <CollapsibleSection
                        title={section.title}
                        isOpen={openIndex === index}
                        onToggle={() => {
                            if (openIndex !== index) {
                                setOpenIndex(index);
                            }
                        }}
                    >
                        {section.content}
                    </CollapsibleSection>
                </View>
            ))}
        </View>
    );
};