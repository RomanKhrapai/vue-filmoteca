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
import { db } from "../fireBase";
import { ref, computed } from "vue";

const authFB = getAuth();
const toast = useToast();

export const useAuthStore = defineStore("auth", () => {
    const auth = ref({
        isError: false,
        isAuthorized: false,
        oldPath: null,
        user: {
            uid: null,
            name: null,
            email: null,
            library: [],
        },
    });

    const uid = computed(() => auth.value.user.uid);
    const name = computed(() => auth.value.user.name);
    const path = computed(() => auth.value.oldPath);
    const isAuthorized = computed(() => auth.value.isAuthorized);
    const plannedFilms = computed(() => {
        return auth.value.user.library.filter((film) => !film.isWatched);
    });
    const favoriteFilms = computed(() =>
        auth.value.user.library.filter((film) => film.isWatched)
    );
    function setPath(path) {
        auth.value.oldPath = path;
    }
    function clearPath() {
        auth.value.oldPath = null;
    }
    async function onAuth() {
        onAuthStateChanged(authFB, async (user) => {
            if (user) {
                await getLibrari();
                auth.value.isAuthorized = true;
                auth.value.user.uid = user.uid;
                auth.value.user.name = user.displayName;
                auth.value.user.email = user.email;
                if (user.displayName) {
                    toast.success("Доброго дня " + user.displayName + "!");
                }
            }
        });
    }
    async function delfilm(idDoc) {
        await deleteDoc(doc(db, `users/user/${uid}`, idDoc));
        getLibrari();
    }

    async function getLibrari() {
        const querySnapshot = await getDocs(
            collection(db, `users/user/${uid}`)
        );
        auth.value.user.library = [];
        querySnapshot.forEach((doc) => {
            const film = doc.data();
            film.idDoc = doc.id;
            auth.value.user.library.push(film);
        });
    }

    async function addFilmToLibrary(data, isWatched) {
        try {
            if (
                auth.value.user.library.find(
                    (film) =>
                        film.id === data.id && film.isWatched === isWatched
                )
            ) {
                return;
            }
            const film = { ...data };
            film.genres = film.genres.split(", ");
            film.isWatched = isWatched;
            await addDoc(collection(db, `users/user/${uid}`), film);
            getLibrari();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    async function loginUser({ email, password }) {
        auth.value.isLoading = true;
        try {
            const res = await signInWithEmailAndPassword(
                authFB,
                email,
                password
            );

            const user = res.user;
            auth.value.isAuthorized = true;
            auth.value.user.name = user.displayName;
            auth.value.user.email = user.email;
            auth.value.isLoading = false;
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
            auth.value.isLoading = false;
        }
    }
    async function logOut() {
        auth.value.isLoading = true;
        try {
            await signOut(authFB);
            auth.value.user.library = [];
            auth.value.user.name = null;
            auth.value.isAuthorized = false;
            auth.value.isLoading = false;
        } catch (error) {
            auth.value.isLoading = false;
        }
    }
    async function registerUser(payload) {
        auth.value.isLoading = true;
        const { email, password, name } = payload;
        try {
            await createUserWithEmailAndPassword(authFB, email, password);
            await updateProfile(authFB.currentUser, {
                displayName: name,
            });
            auth.value.isAuthorized = true;
            auth.value.user.name = auth.currentUser.displayName;
            auth.value.email = auth.currentUser.email;
            auth.value.isLoading = false;
            auth.value.user.uid = auth.currentUser.uid;
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
            auth.value.isLoading = false;
        }
    }
    return {
        auth,
        isAuthorized,
        uid,
        name,
        path,
        plannedFilms,
        favoriteFilms,
        setPath,
        clearPath,
        onAuth,
        delfilm,
        getLibrari,
        addFilmToLibrary,
        loginUser,
        logOut,
        registerUser,
    };
});
