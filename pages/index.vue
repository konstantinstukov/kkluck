<script setup>
// Тестовые данные
const likesResultMock = [
  {
    id: 786106,
    user: {
      id: 229,
      username: "Альфарий  Торррентский",
      avatar: {
        tiny: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/229/avatar/323b72835a574480b639d732224a4a9a.png",
        small:
            "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/229/avatar/0db2741c038f41118daa25e3e263c916.png",
        big: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/229/avatar/d12911505fda45d7936a5ab58185a1bc.png",
      },
      background_url:
          "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/229/background/89093ccb5c104fac8ad6eb436aa152b6.png",
      is_supporter: false,
      datetime_last_seen: "2025-04-15T22:14:51.859292+03:00",
    },
    is_negative: false,
  },
  {
    id: 786405,
    user: {
      id: 1342,
      username: "Ильящер",
      avatar: {
        tiny: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/1342/avatar/e4e11ed98e684aab9bb1682599caa0a5.jpg",
        small:
            "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/1342/avatar/a6ad43e792174791a9bc135458071dda.jpg",
        big: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/1342/avatar/ab8e7d807caa43d5944e262ea5be4be1.jpg",
      },
      background_url: "/static/img/default-background.png",
      is_supporter: false,
      datetime_last_seen: "2025-04-15T18:34:17.436724+03:00",
    },
    is_negative: false,
  },
  {
    id: 786410,
    user: {
      id: 1548,
      username: "Gillian",
      avatar: {
        tiny: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/1548/avatar/3ee9ac3a099746cd99abc72d95b14963.jpg",
        small:
            "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/1548/avatar/b504611472b84a7ebfd5faabee6d4696.jpg",
        big: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/1548/avatar/f835fe712af345348a6dfb604ab04229.jpg",
      },
      background_url:
          "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/1548/background/b57b06f4e60d438cb0de22c635caaba5.png",
      is_supporter: null,
      datetime_last_seen: "2025-04-15T18:05:12.379559+03:00",
    },
    is_negative: false,
  },
  {
    id: 786604,
    user: {
      id: 886,
      username: "Blazar",
      avatar: {
        tiny: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/886/avatar/7a14a30043d248ccab6ebb91596af85a.jpg",
        small:
            "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/886/avatar/49289f3718d642ca949f97cae483e20b.jpg",
        big: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/886/avatar/f86f0526105b4b0fbfd422c814b070d6.jpg",
      },
      background_url: "/static/img/default-background.png",
      is_supporter: true,
      datetime_last_seen: "2025-04-15T20:54:48.152649+03:00",
    },
    is_negative: false,
  },
  {
    id: 786980,
    user: {
      id: 62,
      username: "Greedy Rabbit",
      avatar: {
        tiny: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/62/avatar/075a0988f0da4d8e88eb90906d1f3026.png",
        small:
            "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/62/avatar/f0bd705bb5e34ea1ba39151bcb5aef39.png",
        big: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/62/avatar/46bfc94644094d8a886aaea17e720c53.png",
      },
      background_url:
          "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/62/background/e4ae3fd3ee7e40b5a135bd849d99dd6b.gif",
      is_supporter: false,
      datetime_last_seen: "2025-04-15T22:15:41.447186+03:00",
    },
    is_negative: false,
  },
];
const commentsResultMock = {
  is_deleted: false,
  is_edit_mode: false,
  id: 118316,
  user: {
    id: 50,
    username: "inpwbusina",
    avatar: {
      tiny: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/50/avatar/c9d40d80414043a59c5c88dba629d972.jpg",
      small:
          "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/50/avatar/5fb40d907e1f44ccbb9fb9a859b72093.jpg",
      big: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/50/avatar/b092c4f9ea964402a4785ead663dd5bb.jpg",
    },
    background_url:
        "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/50/background/4e2b3c3612ef400796865c9233b97b66.jpeg",
    is_supporter: true,
    datetime_last_seen: "2025-04-15T22:37:15.909853+03:00",
  },
  text: '<p>Сегодня прямо день занятных трейлеров. Угадайте, дети, в какую игру разработчики этой играли много-много раз</p><p><a data-auto="" href="https://youtu.be/kxlEkfShxVI?si=SvCBcHRckiHuZNz1" target="_blank">https://youtu.be/kxlEk...</a></p>',
  images: [
    {
      id: 193828,
      url: "/live/m/picture/46adffd12c984b11abbca38e8207689b.png",
      preview: null,
      is_video: false,
      width: 962,
      height: 334,
      md5_checksum: "94c1ab36d53f1b3bfd2d640fc16a6e21",
    },
  ],
  embeds: [
    {
      uid: "kxlEkfShxVI",
      embed_type: "youtube",
    },
  ],
  is_media_hidden: false,
  is_images_hidden: false,
  is_pwnd: false,
  pwnd: 9,
  is_ownd: false,
  ownd: 0,
  datetime_created: "2025-04-15T17:51:43.983275+03:00",
  is_bookmarked: false,
  is_frozen: false,
  is_muted_value: false,
  is_pinned: false,
  is_public: true,
  is_reversed: false,
  short_title: "Сегодня прямо день занятных трейлеров. …",
  description:
      "Сегодня прямо день занятных трейлеров. Угадайте, дети, в какую игру разработчики этой играли много-много разhttps://youtu.be/kxlEk...",
  comments: [
    {
      is_deleted: false,
      is_edit_mode: false,
      id: 566736,
      user: {
        id: 1560,
        username: "Versa",
        avatar: {
          tiny: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/1560/avatar/4e1b568ea8b548c59432771e2bccaffe.png",
          small:
              "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/1560/avatar/fce5ce324e13469bacd9b600c7f7d219.png",
          big: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/1560/avatar/a3376931750c4311bd77245045f95ac7.png",
        },
        background_url: "/static/img/default-background.png",
        is_supporter: true,
        datetime_last_seen: "2025-04-15T22:37:18.840597+03:00",
      },
      text: "<p>ты Dredge имеешь в виду или Sea of Thieves?)</p>",
      images: [],
      embeds: [],
      is_media_hidden: false,
      is_images_hidden: false,
      is_pwnd: false,
      pwnd: 0,
      is_ownd: false,
      ownd: 0,
      datetime_created: "2025-04-15T19:09:14.188043+03:00",
      respond_to_comment: null,
    },
    {
      is_deleted: false,
      is_edit_mode: false,
      id: 566736,
      user: {
        id: 1560,
        username: "Versa",
        avatar: {
          tiny: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/1560/avatar/4e1b568ea8b548c59432771e2bccaffe.png",
          small:
              "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/1560/avatar/fce5ce324e13469bacd9b600c7f7d219.png",
          big: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/1560/avatar/a3376931750c4311bd77245045f95ac7.png",
        },
        background_url: "/static/img/default-background.png",
        is_supporter: true,
        datetime_last_seen: "2025-04-15T22:37:18.840597+03:00",
      },
      text: "<p>ты Dredge имеешь в виду или Sea of Thieves?)</p>",
      images: [],
      embeds: [],
      is_media_hidden: false,
      is_images_hidden: false,
      is_pwnd: false,
      pwnd: 0,
      is_ownd: false,
      ownd: 0,
      datetime_created: "2025-04-15T19:09:14.188043+03:00",
      respond_to_comment: null,
    },
    {
      is_deleted: false,
      is_edit_mode: false,
      id: 566736,
      user: {
        id: 1560,
        username: "Versa",
        avatar: {
          tiny: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/1560/avatar/4e1b568ea8b548c59432771e2bccaffe.png",
          small:
              "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/1560/avatar/fce5ce324e13469bacd9b600c7f7d219.png",
          big: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/1560/avatar/a3376931750c4311bd77245045f95ac7.png",
        },
        background_url: "/static/img/default-background.png",
        is_supporter: true,
        datetime_last_seen: "2025-04-15T22:37:18.840597+03:00",
      },
      text: "<p>ты Dredge имеешь в виду или Sea of Thieves?)</p>",
      images: [],
      embeds: [],
      is_media_hidden: false,
      is_images_hidden: false,
      is_pwnd: false,
      pwnd: 0,
      is_ownd: false,
      ownd: 0,
      datetime_created: "2025-04-15T19:09:14.188043+03:00",
      respond_to_comment: null,
    },
    {
      is_deleted: false,
      is_edit_mode: false,
      id: 566736,
      user: {
        id: 1560,
        username: "Versa",
        avatar: {
          tiny: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/1560/avatar/4e1b568ea8b548c59432771e2bccaffe.png",
          small:
              "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/1560/avatar/fce5ce324e13469bacd9b600c7f7d219.png",
          big: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/1560/avatar/a3376931750c4311bd77245045f95ac7.png",
        },
        background_url: "/static/img/default-background.png",
        is_supporter: true,
        datetime_last_seen: "2025-04-15T22:37:18.840597+03:00",
      },
      text: "<p>ты Dredge имеешь в виду или Sea of Thieves?)</p>",
      images: [],
      embeds: [],
      is_media_hidden: false,
      is_images_hidden: false,
      is_pwnd: false,
      pwnd: 0,
      is_ownd: false,
      ownd: 0,
      datetime_created: "2025-04-15T19:09:14.188043+03:00",
      respond_to_comment: null,
    },
    {
      is_deleted: false,
      is_edit_mode: false,
      id: 566741,
      user: {
        id: 81,
        username: "Фома Киняев",
        avatar: {
          tiny: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/81/avatar/1b6ef4f62f3443fc895a2ec07482649b.gif",
          small:
              "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/81/avatar/90c77a6ce8d0463aa498c09beb87c78f.gif",
          big: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/81/avatar/23fe4c86567f4d41b89c75fc8c57b0df.gif",
        },
        background_url:
            "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/81/background/8aa72a0921eb49629ebf73a6558924e8.png",
        is_supporter: false,
        datetime_last_seen: "2025-04-15T20:04:29.186651+03:00",
      },
      text: "<p>выглядит прям замечательно, но страшно. </p>",
      images: [],
      embeds: [],
      is_media_hidden: false,
      is_images_hidden: false,
      is_pwnd: false,
      pwnd: 0,
      is_ownd: false,
      ownd: 0,
      datetime_created: "2025-04-15T19:14:54.868976+03:00",
      respond_to_comment: null,
    },
    {
      is_deleted: false,
      is_edit_mode: false,
      id: 566742,
      user: {
        id: 50,
        username: "inpwbusina",
        avatar: {
          tiny: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/50/avatar/c9d40d80414043a59c5c88dba629d972.jpg",
          small:
              "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/50/avatar/5fb40d907e1f44ccbb9fb9a859b72093.jpg",
          big: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/50/avatar/b092c4f9ea964402a4785ead663dd5bb.jpg",
        },
        background_url:
            "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/50/background/4e2b3c3612ef400796865c9233b97b66.jpeg",
        is_supporter: true,
        datetime_last_seen: "2025-04-15T22:37:15.909853+03:00",
      },
      text: '<p><scroll-link :to="{ name: \'user\', params: { id: 1560 } }" class="mention-item" data-id="1560" data-username="Versa">Versa</scroll-link>, да</p>',
      images: [],
      embeds: [],
      is_media_hidden: false,
      is_images_hidden: false,
      is_pwnd: false,
      pwnd: 1,
      is_ownd: false,
      ownd: 0,
      datetime_created: "2025-04-15T19:17:15.566446+03:00",
      respond_to_comment: {
        id: 566736,
        user: {
          id: 1560,
          username: "Versa",
          avatar: {
            tiny: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/1560/avatar/4e1b568ea8b548c59432771e2bccaffe.png",
            small:
                "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/1560/avatar/fce5ce324e13469bacd9b600c7f7d219.png",
            big: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/1560/avatar/a3376931750c4311bd77245045f95ac7.png",
          },
          background_url: "/static/img/default-background.png",
          is_supporter: true,
          datetime_last_seen: "2025-04-15T22:37:18.840597+03:00",
        },
        text: "ты Dredge имеешь в виду или Sea of Thieves?)",
        datetime_created: "2025-04-15T19:09:14.188043+03:00",
      },
    },
    {
      is_deleted: false,
      is_edit_mode: false,
      id: 566757,
      user: {
        id: 693,
        username: "mafbot",
        avatar: {
          tiny: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/693/avatar/ad2eaad7cb8648d486c540b85221ef38.jpg",
          small:
              "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/693/avatar/bf00752039064d45bc8054b63c667892.jpg",
          big: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/693/avatar/0a1a6573de3b4be4a458ae1c071a139b.jpg",
        },
        background_url:
            "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/693/background/f525533f28274024afc860319cf59b4d.jpeg",
        is_supporter: true,
        datetime_last_seen: "2025-04-15T22:11:29.478804+03:00",
      },
      text: "<p>Если посмотреть на логотип разрабов, то покажется, что поляки решили сделать Black Salt Games Poland edition.</p>",
      images: [],
      embeds: [],
      is_media_hidden: false,
      is_images_hidden: false,
      is_pwnd: false,
      pwnd: 0,
      is_ownd: false,
      ownd: 0,
      datetime_created: "2025-04-15T19:32:02.552883+03:00",
      respond_to_comment: null,
    },
    {
      is_deleted: false,
      is_edit_mode: false,
      id: 566741,
      user: {
        id: 81,
        username: "Фома Киняев",
        avatar: {
          tiny: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/81/avatar/1b6ef4f62f3443fc895a2ec07482649b.gif",
          small:
              "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/81/avatar/90c77a6ce8d0463aa498c09beb87c78f.gif",
          big: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/81/avatar/23fe4c86567f4d41b89c75fc8c57b0df.gif",
        },
        background_url:
            "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/81/background/8aa72a0921eb49629ebf73a6558924e8.png",
        is_supporter: false,
        datetime_last_seen: "2025-04-15T20:04:29.186651+03:00",
      },
      text: "<p>выглядит прям замечательно, но страшно. </p>",
      images: [],
      embeds: [],
      is_media_hidden: false,
      is_images_hidden: false,
      is_pwnd: false,
      pwnd: 0,
      is_ownd: false,
      ownd: 0,
      datetime_created: "2025-04-15T19:14:54.868976+03:00",
      respond_to_comment: null,
    },
    {
      is_deleted: false,
      is_edit_mode: false,
      id: 566741,
      user: {
        id: 81,
        username: "Фома Киняев",
        avatar: {
          tiny: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/81/avatar/1b6ef4f62f3443fc895a2ec07482649b.gif",
          small:
              "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/81/avatar/90c77a6ce8d0463aa498c09beb87c78f.gif",
          big: "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/81/avatar/23fe4c86567f4d41b89c75fc8c57b0df.gif",
        },
        background_url:
            "https://kknights.s3.eu-central-003.backblazeb2.com/live/m/user/81/background/8aa72a0921eb49629ebf73a6558924e8.png",
        is_supporter: false,
        datetime_last_seen: "2025-04-15T20:04:29.186651+03:00",
      },
      text: "<p>выглядит прям замечательно, но страшно. </p>",
      images: [],
      embeds: [],
      is_media_hidden: false,
      is_images_hidden: false,
      is_pwnd: false,
      pwnd: 0,
      is_ownd: false,
      ownd: 0,
      datetime_created: "2025-04-15T19:14:54.868976+03:00",
      respond_to_comment: null,
    },
  ],
  comments_count: 5,
  views_count: 211,
};

let formData = reactive({});
const isLoading = ref(false);
const error = ref(null);
const showResult = ref(false);
const apiResult = ref(null);
// const baseUrl = "https://kknights.com/api/v1";


const handleFormData = async (data) => {
  formData = data;
  showResult.value = true;
  await submitFormData();
};

// function getApiPathFromUrl(url, type = "like") {
//   if (type === "like") {
//     const match = url.match(/(?:bonfire|posts)\/(\d+)/);
//     return match ? `/like/${match[1]}/?type=1` : null;
//   } else if (type === "comment") {
//     const match = url.match(/posts\/([\d\w-]+)/);
//     return match ? `post/${match[1]}/` : null;
//   }
//   return null;
// }

const submitFormData = async () => {
  error.value = null;
  isLoading.value = true;
  apiResult.value = null;

  try {
    apiResult.value = formData.filterBy === 'like' ? likesResultMock : commentsResultMock.comments;
    await new Promise(resolve => setTimeout(resolve, 1000));

  } catch (err) {
    error.value = err.message;
    showResult.value = false;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center mt-8 mb-8 pl-4 pr-4">
    <AppForm @submit-form-data="handleFormData"/>
    <div v-if="showResult" class="mt-8">
      <div v-if="isLoading" class="flex justify-center">
        <div class="w-8 h-8 border-4 border-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
      <AppResult
          v-else-if="apiResult"
          :api-result="apiResult"
          :form-data="formData"
      />
      <div v-else-if="error" class="text-red-500 text-center">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
