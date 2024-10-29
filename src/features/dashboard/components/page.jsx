import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getCurrentTimeSession } from '@/lib/utils/date-converter';
import BrightLogo from '@assets/images/app-logo/light.svg';
import { PackagePlus } from 'lucide-react';
import { BellDot } from 'lucide-react';
import { Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Calendar } from './calendar';
import CardContainer from './card-container.tsx';
import Chart from './chart';

function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // !TODO: Implement create new project form
  const handleCreateNewProject = () => {
    console.log('Create new project');
  };

  const currentHour = currentTime.getHours();
  const user = 'Kien';
  const greeting = `Good ${getCurrentTimeSession(currentHour)}, ${user}!`;

  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const dateFormatted = currentTime.toLocaleDateString(undefined, options);
  return (
    <div className="flex w-full gap-4 p-4">
      {/* Section 1 */}
      <div className="mt-4 flex w-full flex-col justify-between gap-8">
        <div className="flex items-center justify-between space-y-2">
          <div className="flex flex-row items-center gap-12">
            <div>
              <p className='text-sm'>{dateFormatted}</p>
              <p className="text-xl font-bold">{greeting}</p>
            </div>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a workspace" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select a workspace</SelectLabel>
                  <SelectItem value="bright">
                    <div className="flex items-center justify-start gap-1">
                      <img
                        src={BrightLogo}
                        alt="Bright Logo"
                        className="h-9 w-9"
                      />

                      {'Bright'}
                    </div>
                  </SelectItem>
                  <SelectItem value="tuturuuu">
                    <div className="flex items-center justify-start gap-1">
                      <img
                        src={BrightLogo}
                        alt="Bright Logo"
                        className="h-9 w-9"
                      />
                      {'Tuturuuu'}
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="flex flex-row items-center">
              <Button className="mr-2" variant="outline">
                <BellDot
                  size={16}
                  className="animate-swingPause"
                />
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="animate-shimmer inline-flex h-12 items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                    onClick={handleCreateNewProject}
                    variant="outline"
                  >
                    <PackagePlus size={16} />
                    <span className="ml-2">{'Add project'}</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create new project</DialogTitle>
                    <DialogDescription>
                      Choose a name for your brand new project
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Project's Name
                      </Label>
                      <Input
                        id="project_name"
                        defaultValue="Bright"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Create</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="outline">
                <Settings size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="place-content-center rounded-md">
          <div className="flex w-full place-content-center">
            <CardContainer />
          </div>
        </div>

        <div className="h-full text-xl font-semibold">
          <Chart />
        </div>
      </div>

      {/* Section 2 */}
      {/* <div className="mr-2 w-3/12 rounded-md border-[1px]">
        <Calendar />
      </div> */}
    </div>
  );
}

export default Dashboard;
