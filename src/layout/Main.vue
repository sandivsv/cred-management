<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();


const currentRoute = computed(() => {
    return router.currentRoute.value.name
})

const showProfile = ref<boolean>(false)
const showMenu = ref<boolean>(false)


</script>

<template>
    <main class="flex flex-row w-[100vw] h-screen m-0 p-0">
        <!-- sidebar   -->
        <section class="sidebar hidden lg:flex flex-col justify-between w-[280px] h-full p-6 bg-[#0C3F62]">
            <!-- company logo -->
            <div class="">
                <div class="my-2">
                    <img class="w-full" src="/images/logo.png" alt="company logo">
                    <div class="w-full font-Montserrat text-sm font-semibold mt-4 tracking-tighter text-white">
                        <h3 class="text-nowrap text-center">Software & Web Development</h3> 
                        <h3 class="text-nowrap">Company - Umbraco Gold Partner</h3>
                    </div>
                </div>

                <!-- sidebar menu -->
                <div class="mt-12">
                    <router-link to="/" >
                        <div class="w-full flex items-center justify-between border-b px-[1px] py-3 font-Montserrat text-sm font-semibold tracking-tighter"
                            :class="[currentRoute == 'home' ? 'text-[#0FA1DB]' : 'text-white border-[#6A94A5]']"
                        >
                            <div class="flex items-center">
                                <HomeIcon class="w-5 h-5 mr-1"/>
                                <h3 class="text-nowrap text-center">Home</h3>
                            </div>
                            <div v-if="currentRoute == 'home'" class="flex items-center">
                                <RightArrowIcon class="w-3 h-3"/>
                            </div>
                        </div>
                    </router-link>

                    <router-link to="/cards" >
                        <div class="w-full flex items-center justify-between border-b px-[1px] py-3 font-Montserrat text-sm font-semibold tracking-tighter"
                            :class="[currentRoute == 'cards' ? 'text-[#0FA1DB]' : 'text-white border-[#6A94A5]']"
                        >
                            <div class="flex items-center">
                                <CardIcon class="w-5 h-5 mr-1"/>
                                <h3 class="text-nowrap text-center">Cards</h3>
                            </div>
                            <div v-if="currentRoute == 'cards'" class="flex items-center">
                                <RightArrowIcon class="w-3 h-3"/>
                            </div>
                        </div>
                    </router-link>

                    <router-link to="/transactions" >
                        <div class="w-full flex items-center justify-between border-b border-[#6A94A5] px-[1px] py-3 font-Montserrat text-sm font-semibold tracking-tighter text-white"
                            :class="[currentRoute == 'transactions' ? 'text-[#0FA1DB]' : 'text-white border-[#6A94A5]']"
                        >
                            <div class="flex items-center">
                                <TransactionIcon class="w-5 h-5 mr-1"/>
                                <h3 class="text-nowrap text-center">Transactions</h3>
                            </div>
                            <div v-if="currentRoute == 'transactions'" class="flex items-center">
                                <RightArrowIcon class="w-3 h-3"/>
                            </div> 
                        </div>
                    </router-link>

                    <router-link to="/settings" >
                        <div class="w-full flex items-center justify-between px-[1px] py-3 font-Montserrat text-sm font-semibold tracking-tighter"
                            :class="[currentRoute == 'settings' ? 'text-[#0FA1DB]' : 'text-white ']"
                        >
                            <div class="flex items-center">
                                <SettingIcon class="w-5 h-5 mr-1"/>
                                <h3 class="text-nowrap text-center">Settings</h3>
                            </div>
                            <div v-if="currentRoute == 'settings'" class="flex items-center">
                                <RightArrowIcon class="w-3 h-3"/>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>

            <button class="w-full flex items-center px-[1px] py-3 font-Montserrat text-sm font-semibold tracking-tighter text-white">
                <LogoutIcon class="w-5 h-5 mr-1"/>
                <h3 class="text-nowrap text-center">Logout</h3>   
            </button>
        </section>


        <section v-if="showMenu" class="block lg:hidden">
            <div @click="showMenu = false" class="fixed inset-0 top-0 left-0 w-full h-full bg-black opacity-50" style="z-index: 70;"></div>
            <div class="sidebar absolute top-0 left-0 flex lg:hidden flex-col justify-between w-[280px] h-full p-6 transition-all duration-500 bg-[#0C3F62]"
                :class="{'translate-x-0': showMenu, '-translate-x-full': !showMenu}" style="z-index: 100;"
            >
                <!-- company logo -->
                <div class="relative">
                    <div class="my-2">
                        <img class="w-full" src="/images/logo.png" alt="company logo">
                        <div class="w-full font-Montserrat text-sm font-semibold mt-4 tracking-tighter text-white">
                            <h3 class="text-nowrap text-center">Software & Web Development</h3> 
                            <h3 class="text-nowrap">Company - Umbraco Gold Partner</h3>
                        </div>
                    </div>

                    <!-- sidebar menu -->
                    <div class="mt-12">
                        <router-link to="/" @click="showMenu = false">
                            <div class="w-full flex items-center justify-between border-b px-[1px] py-3 font-Montserrat text-sm font-semibold tracking-tighter"
                                :class="[currentRoute == 'home' ? 'text-[#0FA1DB]' : 'text-white border-[#6A94A5]']"
                            >
                                <div class="flex items-center">
                                    <HomeIcon class="w-5 h-5 mr-1"/>
                                    <h3 class="text-nowrap text-center">Home</h3>
                                </div>
                                <div v-if="currentRoute == 'home'" class="flex items-center">
                                    <RightArrowIcon class="w-3 h-3"/>
                                </div>
                            </div>
                        </router-link>

                        <router-link to="/cards" @click="showMenu = false">
                            <div class="w-full flex items-center justify-between border-b px-[1px] py-3 font-Montserrat text-sm font-semibold tracking-tighter"
                                :class="[currentRoute == 'cards' ? 'text-[#0FA1DB]' : 'text-white border-[#6A94A5]']"
                            >
                                <div class="flex items-center">
                                    <CardIcon class="w-5 h-5 mr-1"/>
                                    <h3 class="text-nowrap text-center">Cards</h3>
                                </div>
                                <div v-if="currentRoute == 'cards'" class="flex items-center">
                                    <RightArrowIcon class="w-3 h-3"/>
                                </div>
                            </div>
                        </router-link>

                        <router-link to="/transactions" @click="showMenu = false">
                            <div class="w-full flex items-center justify-between border-b border-[#6A94A5] px-[1px] py-3 font-Montserrat text-sm font-semibold tracking-tighter text-white"
                                :class="[currentRoute == 'transactions' ? 'text-[#0FA1DB]' : 'text-white border-[#6A94A5]']"
                            >
                                <div class="flex items-center">
                                    <TransactionIcon class="w-5 h-5 mr-1"/>
                                    <h3 class="text-nowrap text-center">Transactions</h3>
                                </div>
                                <div v-if="currentRoute == 'transactions'" class="flex items-center">
                                    <RightArrowIcon class="w-3 h-3"/>
                                </div> 
                            </div>
                        </router-link>

                        <router-link to="/settings" @click="showMenu = false">
                            <div class="w-full flex items-center justify-between px-[1px] py-3 font-Montserrat text-sm font-semibold tracking-tighter"
                                :class="[currentRoute == 'settings' ? 'text-[#0FA1DB]' : 'text-white ']"
                            >
                                <div class="flex items-center">
                                    <SettingIcon class="w-5 h-5 mr-1"/>
                                    <h3 class="text-nowrap text-center">Settings</h3>
                                </div>
                                <div v-if="currentRoute == 'settings'" class="flex items-center">
                                    <RightArrowIcon class="w-3 h-3"/>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>

                <button @click="showMenu = false" class="w-full flex items-center px-[1px] py-3 font-Montserrat text-sm font-semibold tracking-tighter text-white">
                    <LogoutIcon class="w-5 h-5 mr-1"/>
                    <h3 class="text-nowrap text-center">Logout</h3>   
                </button>
            </div>
        </section>

        <!-- main content -->
        <section id="main-router-page" class="relative main w-full lg:w-[calc(100vw-280px)] overflow-auto">
            <!-- top menu bar -->
            <div class="sticky top-0 z-50 w-auto bg-[#ECEFF1]">
                <div class="topbar flex items-center justify-between h-[50px] px-10 bg-white">
                    <div class="flex items-center text-[#6A94A5]">
                        <MenuIcon @click="router.push({name: 'home'})" class="hidden lg:block w-5 h-5 mr-3 cursor-pointer"/>
                        <MenuIcon @click="showMenu = !showMenu" class="block lg:hidden w-5 h-5 mr-3 cursor-pointer"/>
                        <h1 class="capitalize text-base font-semibold font-Montserrat tracking-tighter ">{{ currentRoute }}</h1>
                    </div>


                    <div @click="showProfile = !showProfile" class="flex items-center text-[#6A94A5]">
                        <div class="cursor-pointer p-2 rounded-full border border-[#6A94A5]">
                            <ProfileIcon class="w-4 h-4"/>
                        </div>
                        <DownIcon class="w-4 h-4 ml-1 transition-all duration-300 " :class="[showProfile ? '-rotate-180' : 'rotate-0']" />
                    </div>

                </div>
                <div class="flex items-center text-sm tracking-wider capitalize text-[#0C3F62] mx-10 h-[50px]">
                    <span class="pr-[4px]"> Home </span>
                    
                    <span v-if="currentRoute !== 'home'" class="flex items-center">
                        <DownIcon class="w-3 h-3 -rotate-90 mx-[2px]"/> 
                        {{ currentRoute }}
                    </span>
                </div>
            </div>

            <!-- content -->
            <div class="">
                <!-- route name card -->

                <!-- router view  -->
                <RouterView />
            </div>
            
        </section>
    </main>

</template>


<style lang="scss" scoped>
.sidebar{
    box-shadow: 2px 0px 4px 0px #68686899;
}

.topbar {
    box-shadow: 0px 2px 5px 0px #68686899;
}



</style>