import { defineStore } from "pinia";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";

const auth = getAuth();

export const useAuthStore = defineStore("auth", {
    state: () => ({
        isError: false,
        isLoading: false,
        isAuthorized: false,
        user: {
            name: null,
            email: null,
        },
    }),
    getters: { name: (state) => state.user.name },
    actions: {
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
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
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
        boom() {
            console.log(555555);
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

                console.log(errorCode);
                this.isLoading = false;
            }
        },
    },
});
