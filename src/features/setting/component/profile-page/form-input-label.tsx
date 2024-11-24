import { FC } from "react";
import React from "react";
import { Control, FieldValues, FieldPath, FieldErrors, ControllerRenderProps } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormInputLabelProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    name: FieldPath<TFieldValues>;
    label: string;
    placeholder?: string;
    className?: string;
}

const FormInputLabel = <TFieldValues extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    className,
}: FormInputLabelProps<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }: { field: ControllerRenderProps<TFieldValues, FieldPath<TFieldValues>> }) => (
                <FormItem className={`flex flex-col ${className}`}>
                    <FormLabel className="text-md font-semibold">{label}</FormLabel>
                    <FormControl>
                        <Input
                            placeholder={placeholder || label}
                            {...field}
                            className="h-12 focus:border-transparent"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormInputLabel;
