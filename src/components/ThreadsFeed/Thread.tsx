import React, {useEffect} from 'react'
import {Thread as ThreadType} from "../../utils/types/Thread";
import {getUserByUid} from "../../firebase/apiCalls";
import {useRecoilState} from "recoil";
import {threadOverview} from "../../atoms/modalAtom";
import {useNavigate} from "react-router-dom";
import {CheckBadgeIcon} from "@heroicons/react/24/solid";
import AttachmentRender from "./AttachmentRender";
import ThreadsActionList from "./ThreadsActionList";

function Thread({uid, text, timeStamp, attachment, id, user}: ThreadType) {

    const [, setOpenedThread] = useRecoilState(threadOverview);
    const navigate = useNavigate();

    function handleSetOpenedThread() {
        navigate(`/threads/${id}`)
        setOpenedThread({opened: true, id: id, uid: uid})
    }

    return (
        <div
             className="text-white cursor-pointer transition-all
             border-b  border-b-gray-200 border-opacity-20  flex flex-row w-full py-2">
            <div className="min-h-full flex flex-col items-center !w-16 ">
                {user?.photoUrl ? (
                    <img className="rounded-full h-[32px] w-[32px] object-contain" src={user?.photoUrl} alt=""/>
                ) : (
                    <div className="rounded-full h-[32px] w-[32px] object-contain  loader-2"></div>
                )}
                <div className="w-[1px]  border-r-2 border-r-gray-400 border-opacity-30 my-2 min-h-[20px] h-full"></div>
                <div className="relative ">
                    <img onClick={handleSetOpenedThread} className="rounded-full h-4 object-contain" src={user?.photoUrl} alt=""/>
                    <img className="rounded-full h-4 absolute left-[65%] bottom-0 ring-2 ring-[#0f0f0f]"
                         src={user?.photoUrl} alt=""/>
                </div>
            </div>
            <div className="w-full pl-3 min-h-[100px] h-[100%] flex flex-col items-start justify-between">
                <div className="flex flex-row items-center">
                    <p className="font-bold text-[14px]">{user?.name}</p>
                    <CheckBadgeIcon className="h-5 text-blue-500 mx-2"/>
                </div>
                <p onClick={handleSetOpenedThread} className="text-sm text-white ">{text}</p>
                {attachment &&
                    <AttachmentRender url={attachment}/>
                }
                <ThreadsActionList openThread={ () => handleSetOpenedThread()} threadId={id}/>
                <p className="text-gray-500 text-sm hover:underline cursor-pointer w-fit justify-self-end">
                    1:13 AM · Dec 19, 2023
                </p>
            </div>
        </div>
    )
}

export default Thread
