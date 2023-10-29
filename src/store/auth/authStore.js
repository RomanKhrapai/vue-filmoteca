import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged,
} from "firebase/auth";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { db } from "../../fireBase";

const auth = getAuth();
const toast = useToast();

export const useAuthStore = defineStore("auth", {
    state: () => ({
        isError: false,
        isLoading: false,
        isAuthorized: false,
        oldPath: null,
        user: {
            name: null,
            email: null,
            library: [],
        },
    }),
    getters: {
        name: (state) => state.user.name,
        path: (state) => state.oldPath,
        plannedFilms: (state) => {
            return state.user.library.filter((film) => !film.isWatched);
        },
        watchedFilms: (state) =>
            state.user.library.filter((film) => film.isWatched),
    },
    actions: {
        async delfilm(idDoc) {
            this.user.library = this.user.library.filter(
                (film) => film.idDoc !== idDoc
            );
            await deleteDoc(
                doc(
                    db,
                    "users/user/${auth.currentUser.uid}",
                    "A8QuVQa2yAE0DLlX4Aqz"
                )
            );
        },
        async getLibrari() {
            const querySnapshot = await getDocs(
                collection(db, `users/user/${auth.currentUser.uid}`)
            );
            querySnapshot.forEach((doc) => {
                const film = doc.data();
                film.idDoc = doc.id;
                this.user.library.push(film);
            });
        },
        async addFilmToLibrary(data, isWatched) {
            try {
                if (
                    this.user.library.find(
                        (film) =>
                            film.id === data.id && film.isWatched === isWatched
                    )
                ) {
                    return;
                }
                const film = { ...data };
                film.genres = film.genres.split(", ");
                film.isWatched = isWatched;
                const docRef = await addDoc(
                    collection(db, `users/user/${auth.currentUser.uid}`),
                    film
                );
                this.user.library.push(film);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },
        async onAuth() {
            await onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.getLibrari();
                    this.isAuthorized = true;
                    this.user.name = user.displayName;
                    this.user.email = user.email;
                    if (user.displayName) {
                        toast.success("Доброго дня " + user.displayName + "!");
                    }
                }
            });
        },
        async loginUser({ email, password }) {
            this.isLoading = true;
            try {
                const res = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                const user = res.user;
                this.isAuthorized = true;
                this.user.name = user.displayName;
                this.user.email = user.email;
                this.isLoading = false;
                //  toast.success("Доброго дня " + user.displayName + "!");
            } catch (error) {
                const errorCode = error.code;
                console.log(errorCode);
                let atherError = true;
                switch (errorCode) {
                    case " auth/invalid-login-credentials":
                        toast.error("Пароль або пошта не вірний!");
                        atherError = false;
                        break;

                    default:
                        if (!atherError) {
                            toast.error("Помилка реєстрації!");
                        }
                        break;
                }
                this.isLoading = false;
            }
        },
        async logOut() {
            this.isLoading = true;
            try {
                await signOut(auth);
                this.isAuthorized = false;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
            }
        },
        async registerUser(payload) {
            this.isLoading = true;
            const { email, password, name } = payload;
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(auth.currentUser, {
                    displayName: name,
                });
                this.isAuthorized = true;
                this.user.name = auth.currentUser.displayName;
                this.email = auth.currentUser.email;
                this.isLoading = false;
            } catch (error) {
                const errorCode = error.code;
                let atherError = true;

                switch (errorCode) {
                    case "auth/email-already-in-use":
                        toast.error("Така пошта вже використовується!");
                        atherError = false;
                        break;
                    case "auth/invalid-display-name":
                        toast.error("імя не може бути пустим!");
                        atherError = false;
                        break;

                    default:
                        if (!atherError) {
                            toast.error("Помилка реєстрації!");
                        }
                        break;
                }
                this.isLoading = false;
            }
        },
    },
});
