import { Button } from '@/components/ui/button';
import { BellDot, Settings, ShieldMinus } from 'lucide-react';
import React from 'react';
import { useState } from 'react';

import BoardTabGroup from '@components/general/tab-group';
import { UnderDevDialog } from '@components/general/under-development-dialog';
import { SYSTEM_ALERT } from '../../../config/constants/strings.global';
import AddMember from '@/layouts/add-member';
import Board from '@features/board/Board';
import { KanbanBoard } from '@features/project/components/kanban-board';
import { MemberList } from '@features/project/components/member-list';
import BreadCrumb from '@components/general/bread-crumb';
import CustomAlertDialog from '@/components/general/custom-alert-dialog';
import { Separator } from '@/components/ui/separator';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Documentation', dropdownItems: ['Projects', 'Components'] },
    { label: 'Software', href: '/docs/components' },
    { label: 'Bright', isCurrent: true },
];

export const Page = ({ projectName = "Bright" }) => {
    const [isUnderDevDialogOpen, setIsUnderDevDialogOpen] = useState(false);
    const [selectedTabIdx, setSelectedTabIdx] = useState(0);
    const [open, setOpen] = useState(false);

    return (
        <OverlayScrollbarsComponent
            element="div"
            options={{ scrollbars: { autoHide: 'scroll' } }}
            defer
            className="flex h-dvh w-full overflow-auto px-2 py-5"
        >
            <div className="px-4">
                {/* Project Headers */}
                <BreadCrumb items={breadcrumbItems} />

                {/* Title + Util Buttons */}
                <div className="flex items-center mt-5 justify-between">
                    <h1 className="text-4xl font-bold">
                        {projectName}
                    </h1>

                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsUnderDevDialogOpen(true)}
                        >
                            <BellDot className="mr-2 h-4 w-4" /> Notifications
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => setIsUnderDevDialogOpen(true)}
                        >
                            <Settings className="mr-2 h-4 w-4" /> Settings
                        </Button>
                    </div>
                </div>
            </div>

            {/* Creation Date + Member List + Privacy */}
            <div className="mb-1 flex h-10 items-center gap-4 mt-5">
                <div className="flex items-center pl-4">
                    <BoardTabGroup
                        selected={selectedTabIdx}
                        setSelected={setSelectedTabIdx}
                        isUnderDevDialogOpen={isUnderDevDialogOpen}
                        setIsUnderDevDialogOpen={setIsUnderDevDialogOpen}
                    />
                </div>

                <Separator orientation="vertical" />

                <div className="flex items-center gap-3">
                    <MemberList width={7} height={7} />
                    <AddMember open={open} onOpenChange={setOpen} />
                </div>

                <Separator orientation="vertical" />

                <CustomAlertDialog
                    title={SYSTEM_ALERT.PRJ_ALT_ACC_TITLE}
                    description={SYSTEM_ALERT.PRJ_ALT_ACC_DES}
                    onAction={() => setIsUnderDevDialogOpen(true)}
                    actionLabel="Continue"
                    cancelLabel="Cancel"
                    trigger={
                        <Button className="h-8 text-rose-400" variant="outline">
                            <ShieldMinus className="h-4" />
                            Private
                        </Button>
                    }
                />
            </div>

            {/* Task Management Board */}
            <div>
                <div className={`${selectedTabIdx === 0 ? 'block' : 'hidden'}`}>
                    <KanbanBoard />
                </div>
                <div className={`${selectedTabIdx === 1 ? 'block' : 'hidden'}`}>
                    <Board />
                </div>
            </div>

            {/* Others */}
            {isUnderDevDialogOpen && (
                <UnderDevDialog
                    isOpen={isUnderDevDialogOpen}
                    setIsOpen={setIsUnderDevDialogOpen}
                />
            )}
        </OverlayScrollbarsComponent>
    );
};
