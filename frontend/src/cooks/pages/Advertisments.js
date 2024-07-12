import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../components/Cards/TitleCard"
import { showNotification } from '../features/common/headerSlice'
import MomentJalali from "moment-jalaali"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../utils/globalConstantUtil'
import { openModal } from "../features/common/modalSlice"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


// load icons
import DeleteIcon from '@iconscout/react-unicons/icons/uil-trash-alt'
import EditIcon from '@iconscout/react-unicons/icons/uil-edit-alt'

import UpdateAdmin from "../features/admins/UpdateAdmin"


const TopSideButtons = () => {

    const dispatch = useDispatch()

    const createNewUser = () => {
        // dispatch(showNotification({ message: "Add New Member clicked", status: 1 }))
        dispatch(openModal({ title: "ایجاد ادمین جدید", bodyType: MODAL_BODY_TYPES.ADD_NEW_ADMIN }))
    }



    // return (
    //     <div className="inline-block float-right">
    //         <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => createNewUser()}>ایجاد کاربر جدید</button>
    //     </div>
    // )
}


const TEAM_MEMBERS = [
    { name: "کاربر یک", avatar: "https://cdn-icons-png.flaticon.com/128/3069/3069172.png", email: "example@admin.test", role: "Owner", joinedOn: MomentJalali(new Date()).add(-5 * 1, 'days').format("jYYYY/jMM/jDD"), lastActive: "5 hr ago" },
    { name: "کاربر دو", avatar: "https://cdn-icons-png.flaticon.com/128/2153/2153090.png", email: "example@admin.test", role: "Admin", joinedOn: MomentJalali(new Date()).add(-5 * 2, 'days').format("jYYYY/jMM/jDD"), lastActive: "15 min ago" },
    { name: "کاربر سه", avatar: "https://cdn-icons-png.flaticon.com/128/1864/1864472.png", email: "example@admin.test", role: "Admin", joinedOn: MomentJalali(new Date()).add(-5 * 3, 'days').format("jYYYY/jMM/jDD"), lastActive: "20 hr ago" },
    { name: "کاربر چهار", avatar: "https://cdn-icons-png.flaticon.com/128/1998/1998627.png", email: "example@admin.test", role: "Manager", joinedOn: MomentJalali(new Date()).add(-5 * 4, 'days').format("jYYYY/jMM/jDD"), lastActive: "1 hr ago" },
    { name: "کاربر پنج", avatar: "https://cdn-icons-png.flaticon.com/128/1864/1864475.png", email: "example@admin.test", role: "Support", joinedOn: MomentJalali(new Date()).add(-5 * 5, 'days').format("jYYYY/jMM/jDD"), lastActive: "40 min ago" },
    { name: "کاربر شش", avatar: "https://cdn-icons-png.flaticon.com/128/809/809052.png", email: "example@admin.test", role: "Support", joinedOn: MomentJalali(new Date()).add(-5 * 7, 'days').format("jYYYY/jMM/jDD"), lastActive: "5 hr ago" },

]

const updateUser = () => {
    alert("update user")
}



const deleteUser = () => {
    Swal.fire({
        title: "آیا از حذف ادمین اطمینان دارید؟",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "بله",
        denyButtonText: `خیر`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire("ادمین حذف شد!", "", "success");
        } else if (result.isDenied) {
            Swal.fire("تغییرات ذخیره نشد", "", "info");
        }
    });
}

const Advertisments = () => {

    const [members, setMembers] = useState(TEAM_MEMBERS)

    const getRoleComponent = (role) => {
        if (role === "Admin") return <div className="badge badge-secondary">ادمین</div>
        if (role === "Manager") return <div className="badge">مدیر داخلی</div>
        if (role === "Owner") return <div className="badge badge-primary">مدیریت اصلی</div>
        if (role === "Support") return <div className="badge badge-accent">پشتیبانی</div>
        else return <div className="badge badge-ghost">{role}</div>
    }

    return (
        <>
            در حال ساخت ...
        </>
    )
}

export default Advertisments