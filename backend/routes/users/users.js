const express = require("express")

const router = express()

const userCtrls = require("../../controllers/users/users")

const protect = require("../../middlewares/authUser")

const { userUpload } = require("../../utils/upload")

router.get('/me', protect, userCtrls.getMe)
router.put('/update-profile', protect, userCtrls.updateProfile)
router.put('/update-avatar', protect, userUpload.single('avatar'), userCtrls.updateAvatar)
router.post('/search-houses', userCtrls.searchHouses)
router.post('/book-house', protect, userCtrls.bookHouse)
router.get('/notifications', userCtrls.notifications)
router.get('/finance', userCtrls.finance)
router.get('/my-tickets', userCtrls.myTickets)
router.post('/create-ticket', userCtrls.createTicket)
router.post('/add-favourite', userCtrls.addFavourite)
router.get('/my-favourites', userCtrls.myFavourites)
router.get('/my-bookings', userCtrls.myBookings)

router.get('/houses', userCtrls.getHouses)
router.get('/houses/:houseId', userCtrls.getHouse)

module.exports = router