import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { CircleDot, Heart, Settings, ShieldMinus } from 'lucide-react';
import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';

import Divider from '../../../components/general/divider';
import BoardTabGroup from '../../../components/general/tab-group';
import { UnderDevDialog } from '../../../components/general/under-development-dialog';
import { SYSTEM_ALERT } from '../../../config/constants/strings.global';
import AddMember from '../../../layouts/add-member';
import Board from '../../board/Board';
import ProjectBreadCrumbs from './breadcrumbs';
import { KanbanBoard } from './kanban-board';
import { MemberList } from './member-list';

export const Page = () => {
    const [isFavoured, setFavourite] = useState(false);
    const [isUnderDevDialogOpen, setIsUnderDevDialogOpen] = useState(false);
    const [selectedTabIdx, setSelectedTabIdx] = useState(0);
    const [open, setOpen] = useState(false);

    return (
        <div className="h-dvh w-full overflow-auto px-2 py-1">
            <div className="px-4">
                {/* Project Headers */}
                <ProjectBreadCrumbs
                    projectType="SOFTWARE"
                    projectOwner="MUDOKER"
                />

                {/* Title + Util Buttons */}
                <div className="flex items-center justify-between">
                    <h1 className="mb-3 mt-4 text-4xl font-bold text-slate-700">
                        Bright
                    </h1>

                    <div className="flex gap-4">
                        <Button
                            className={
                                isFavoured ? 'bg-rose-500 hover:bg-red-500' : ''
                            }
                            onClick={() => setFavourite(!isFavoured)}
                        >
                            <Heart className="mr-2 h-4 w-4" />{' '}
                            {isFavoured ? 'Favourred' : 'Favour'}
                        </Button>

                        <Button
                            className="border-black/15"
                            variant="outline"
                            onClick={() => setIsUnderDevDialogOpen(true)}
                        >
                            <CircleDot className="mr-2 h-4 w-4" /> Issues
                        </Button>

                        <Button
                            className="border-black/15"
                            variant="outline"
                            onClick={() => setIsUnderDevDialogOpen(true)}
                        >
                            <Settings className="mr-2 h-4 w-4" /> Settings
                        </Button>
                    </div>
                </div>
            </div>

            {/* Creation Date + Member List + Privacy */}
            <div className="mb-1 flex h-10 items-center gap-4">
                <div className="flex items-center pl-4">
                    <BoardTabGroup
                        selected={selectedTabIdx}
                        setSelected={setSelectedTabIdx}
                        isUnderDevDialogOpen={isUnderDevDialogOpen}
                        setIsUnderDevDialogOpen={setIsUnderDevDialogOpen}
                    />
                </div>

                <Divider width="1.5px" height="70%" color="rgba(0,0,0,0.2)" />

                <div className="flex items-center">
                    <MemberList width={7} height={7} />
                    <AddMember open={open} onOpenChange={setOpen} />
                </div>

                <Divider width="1.5px" height="70%" color="rgba(0,0,0,0.2)" />

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            className="h-8 border-black/15 bg-white text-rose-500 hover:bg-slate-200/75"
                            variant="outline"
                        >
                            <ShieldMinus className="h-4" />
                            Private
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-xl font-bold">
                                {SYSTEM_ALERT.PRJ_ALT_ACC_TITLE}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                {SYSTEM_ALERT.PRJ_ALT_ACC_DES}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => setIsUnderDevDialogOpen(true)}
                            >
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
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
        </div>
    );
};

Page.propTypes = {
    title: PropTypes.string,
};
