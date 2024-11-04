import './index.module.css';
import React from 'react';
import {
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonAvatar,
    IonButton,
    IonIcon,
    IonItem,
    IonImg,
} from '@ionic/react';


// import { ellipsisVertical, contactOutline, folderOutline, image } from 'ionicons/icons';
import { ContactRoundIcon, EllipsisVertical, FolderClosedIcon } from 'lucide-react';
import { log } from 'console';

interface CardProps {
    title: string;
    grupo: string;
    professorName: string;
    deadline: string;
    activityDetails: string;
    profileImage: string | null;
}

const Card: React.FC<CardProps> = ({ title, grupo, professorName, deadline, activityDetails, profileImage }: CardProps) => {
    return (
        <IonItem>
            <div className='bg-white shadow-md rounded-lg max-w-[19rem] w-full h-[20.5rem] ml-0 mr-[0.1rem] mb-1 border border-gray-300'>
                {/* Header */}
                <div className='bg-green-700 text-white pl-4 rounded-t-lg justify-between items-center'>
                    <div className='flex items-center'>
                        <div className='hover:underline'>
                            <h2 className='text-xl truncate w-[12.5rem]'>{title}</h2>
                            <p className='text-xs'>{grupo}</p>
                        </div>
                        <div className='relative rounded-full bg-white-600 items-center justify-center text-white ml-[2.5rem] mt-4 mr-2'>
                            <button className='mr-2'>
                                <EllipsisVertical size={24} />
                            </button>
                        </div>
                    </div>
                </div>
                {/* Professor Info */}
                <div className='bg-green-700 text-white px-4 pt-2 pb-3 flex items-center'>
                    <p className='text-xs truncate w-[11.5rem] hover:underline'>{professorName}</p>
                </div>
                <div className='flex justify-end mb-2 mx-5 -mt-[2.90rem]'>
                    <div className="h-20 w-24 object-cover text-black-500">
                        {profileImage && (
                            <img 
                                src={`data:image/jpeg;base64,${profileImage}`}
                                className="card-image rounded-full"
                                alt={title}
                                style={{ width: '90px', height: '90px'}}  
                            />
                        )}
                    </div>
                </div>
                {/* Content */}
                <div className={`flex-grow pb-5 pl-4 h-[6rem]`}>
                    <div className={`${ deadline ? '' : 'hidden' } mt-4`}>
                        <p className={'text-xs text-black-500'}>Data de entrega: {deadline}</p>
                        <p className='text-xs text-black-700 truncate w-52 hover:underline'>{activityDetails}</p>
                    </div>
                </div>
                {/* Footer */}
                <div className='flex justify-end items-center border-t-2 px-4 pt-6 text-black'>
                    <button className='bg-black-300 rounded-full flex items-center justify-center mx-5'>
                        <ContactRoundIcon size={24} />
                    </button>
                    <button className="bg-black-300 rounded-full flex items-center justify-center">
                        <FolderClosedIcon size={24} />
                    </button>
                </div>
            </div>
        </IonItem>
    );
}

export default Card;
