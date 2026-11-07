<script setup lang="ts">
import type { AudioPlaybackState } from '~/types/wedding'

const props = defineProps<{
  autoPlayTrigger: boolean
}>()

const audioState = ref<AudioPlaybackState>('PAUSED')
const audioRef = ref<HTMLAudioElement | null>(null)
// Royalty-free acoustic wedding background music
const audioSource = 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113524.mp3'

const playAudio = async () => {
  if (!audioRef.value) return
  try {
    await audioRef.value.play()
    audioState.value = 'PLAYING'
  } catch {
    audioState.value = 'BLOCKED_AUTOPLAY'
  }
}

const pauseAudio = () => {
  if (!audioRef.value) return
  audioRef.value.pause()
  audioState.value = 'PAUSED'
}

const toggleAudio = () => {
  if (audioState.value === 'PLAYING') {
    pauseAudio()
  } else {
    playAudio()
  }
}

watch(() => props.autoPlayTrigger, (triggered) => {
  if (triggered) {
    playAudio()
  }
})

onBeforeUnmount(() => {
  if (audioRef.value) {
    audioRef.value.pause()
  }
})
</script>

<template>
  <div>
    <!-- Hidden HTML5 Audio Element -->
    <audio
      ref="audioRef"
      :src="audioSource"
      loop
      preload="none"
    />

    <!-- Floating Audio Toggle Button -->
    <div class="fixed bottom-6 right-6 z-40">
      <button
        type="button"
        class="w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 border-2"
        :class="audioState === 'PLAYING'
          ? 'bg-[#FB8500] text-white border-white animate-spin-slow scale-105'
          : 'bg-[#023047] text-[#8ECAE6] border-[#219EBC]/50 hover:scale-105'"
        :title="audioState === 'PLAYING' ? 'Jeda Musik' : 'Putar Musik Latar'"
        @click="toggleAudio"
      >
        <Icon
          :name="audioState === 'PLAYING' ? 'heroicons:musical-note-20-solid' : 'heroicons:speaker-x-mark-20-solid'"
          class="w-6 h-6"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}
</style>
