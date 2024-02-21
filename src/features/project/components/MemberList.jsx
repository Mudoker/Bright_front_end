/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import userDefaultProfile from '@/assets/images/user-profile-default.svg';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

const sampleMembers = [
  {name: 'John Doe', imageUrl: userDefaultProfile},
  {name: 'Jane Smith', imageUrl: userDefaultProfile},
  {name: 'Michael Johnson', imageUrl: userDefaultProfile},
];

export const MemberList = ({members = sampleMembers, width = 8, height = 8}) => {
  // Check if the number of members is less than 5
  const shouldRenderLink = members.length < 5;

  return (
    <div className='flex'>
      <div className="flex -space-x-4 rtl:space-x-reverse mr-5">
        {members.map((member, index) => (
          <Avatar
            key={index}
            className={`w-${width} h-${height} rounded-full`}
          >
            <AvatarImage src={member.imageUrl} alt={member.name} />
            <AvatarFallback>BR</AvatarFallback>
          </Avatar>
        ))}

        {shouldRenderLink && (
          <a
            className={`flex items-center justify-center font-thin text-sm text-white w-${width} h-${height} text-xs font-medium text-black bg-gray-500 rounded-full hover:bg-gray-600 dark:border-gray-800 z-10`}
            href="#"
          >
            +5
          </a>
        )}
      </div>
    </div>
  );
};

MemberList.propTypes = {
  members: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
      }),
  ),
  width: PropTypes.number,
  height: PropTypes.number,
};