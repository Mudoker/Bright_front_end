import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { getRandomColor } from '@/components/utils/color-generator';
import { Check, ChevronsUpDown, Pencil } from 'lucide-react';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';

import { DEFAULT_TASK_TAGS } from '../../assets/values';

export const CreatableMultiSelectDropdown = ({
    selectedTags,
    setSelectedTags,
}) => {
    const [open, setOpen] = useState(false);
    const [tagList, setTagList] = useState(DEFAULT_TASK_TAGS);
    const [searchPhrase, setSearchPhrase] = useState('');

    // Create new tag
    const handleAddNewTag = title => {
        const newTag = {
            value: title,
            color: getRandomColor(),
            description: `Tasks related to ${title}`,
        };

        setTagList({ ...tagList, [title]: newTag });
        setSearchPhrase('');
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    Select tags...
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        onValueChange={txt => setSearchPhrase(txt)}
                        value={searchPhrase}
                        onChange={e => setSearchPhrase(e.target.value)}
                        placeholder="Search tags..."
                    />
                    <CommandEmpty className="m-1">
                        <div
                            className="flex h-full w-full items-center rounded-sm px-2 py-1.5 text-sm hover:cursor-pointer hover:bg-slate-300/25"
                            onClick={() => handleAddNewTag(searchPhrase)}
                        >
                            <Pencil className="mr-4 h-3 w-3" /> Add &apos;
                            {searchPhrase}&apos;
                        </div>
                    </CommandEmpty>
                    <CommandGroup>
                        {Object.keys(tagList).map(tagKey => (
                            <CommandItem
                                key={tagKey}
                                value={`${tagList[tagKey].value}-${tagList[tagKey].color}`}
                                onSelect={currentValue => {
                                    setSelectedTags(
                                        selectedTags.findIndex(
                                            tag => tag === currentValue
                                        ) !== -1
                                            ? selectedTags.filter(
                                                  tag => tag !== currentValue
                                              )
                                            : [...selectedTags, currentValue]
                                    );
                                }}
                            >
                                {/* Selected mark */}
                                <Check
                                    className={`mr-2 h-4 w-4 ${selectedTags.findIndex(tag => tag.split('-')[0] === tagList[tagKey].value) !== -1 ? 'opacity-100' : 'opacity-0'}`}
                                />

                                {/* Tag Color Dot */}
                                <div
                                    className={`mr-3 h-2 w-2 rounded-full`}
                                    style={{
                                        background: `${tagList[tagKey].color}`,
                                    }}
                                />

                                {/* Title */}
                                {tagKey}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

CreatableMultiSelectDropdown.propTypes = {
    setSelectedTags: PropTypes.func,
    selectedTags: PropTypes.array,
};
