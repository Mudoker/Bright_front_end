import React, { SVGProps, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Braces, CircleDot, Database, FileText, Kanban, Sparkles } from 'lucide-react'
import { useSelector } from 'react-redux';
import { DataFactory, UsageDataType } from '../../utils/data-factory';
interface LimitItemProps {
    Icon: React.ComponentType<SVGProps<SVGSVGElement>>;
    label: string;
    currentUsage: string | number;
    usageLimit: any;
}

const LimitItem: React.FC<LimitItemProps> = ({ Icon, label, currentUsage, usageLimit }) => (
    <div className="flex flex-col space-y-1.5 h-full w-72">
        <Button variant="outline" className="justify-start py-6 rounded-lg">
            <Icon className="h-5 w-5" />
            <div className="ml-3 text-ellipsis truncate dark:text-white font-semibold text-sm mr-4">
                {label}
            </div>
            <div className="flex flex-row items-center ml-auto">
                {currentUsage} / {usageLimit}
            </div>
        </Button>
    </div>
)

export const CurrentPlanLimitContainer = () => {
    const currentDataViewMode = useSelector((state: any) => state.dataViewMode.current);
    const [currentUsage, setCurrentUsage] = React.useState<UsageDataType>(DataFactory.getUsageData(currentDataViewMode));

    useEffect(() => {
        setCurrentUsage(DataFactory.getUsageData(currentDataViewMode));
    }, [currentDataViewMode]);

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle className="text-lg">Current Plan</CardTitle>
                <CardDescription>
                    {"You're exploring as a Free Tier member."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <LimitItem Icon={Kanban} label="Projects" currentUsage={currentUsage.projects} usageLimit={"5 Created"} />
                        <LimitItem Icon={CircleDot} label="Issues" currentUsage={currentUsage.issues} usageLimit={"200 Unit"} />
                        <LimitItem Icon={Database} label="Storage" currentUsage={currentUsage.storage} usageLimit={"5 GB"} />
                        <LimitItem Icon={FileText} label="File Upload" currentUsage={currentUsage.fileUpload} usageLimit={"1 GB"} />
                        <LimitItem Icon={Braces} label="Tokens Used" currentUsage={currentUsage.tokensUsed} usageLimit={"1 Mil"} />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" className="w-full flex gap-4 items-center font-semibold">
                    Upgrade to Premium <Sparkles className='w-4 h-4' />
                </Button>
            </CardFooter>
        </Card>
    )
}
