<template>
    <main class="flex flex-row w-screen h-screen m-0 p-0">
        <!-- sidebar   -->
        <div class="sidebar min-w-[280px] w-1/6 h-full p-4 bg-[#0C3F62]">
            <!-- company logo -->
            <img class="w-16 h-16" src="../assets/images/logo.png" alt="company logo">
            
        </div>

        <!-- main content -->
        <div>
            <!-- top menu bar -->
            <div>

            </div>

            <!-- content -->
            <div>
                <!-- route name card -->

                <!-- router view  -->
                <RouterView />
            </div>
            
        </div>
    </main>

</template>


<style lang="scss" scoped>
.sidebar{
    box-shadow: 2px 0px 4px 0px #68686899;
}



</style>