import { TUserType } from "../common";

export type UsersResponse = {
  data: UserResponseEntry[];
  numberOfRecords: [
    {
      _uniq_exact: {
        user_id: number;
      };
    }
  ];
};

export type UsersBySegmentResponse = {
  users: UserResponseEntry[];
  numberOfRecords: [
    {
      _uniq_exact: {
        user_id: number;
      };
    }
  ];
};

export type UserResponseEntry = {
  user_id: string;
  video_view_cnt_sum: number;
  video_success_publish_cnt_sum: number;
  os_name: string;
  city: string;
  first_visit_date: string;
};

export type UserData = UserResponseEntry & { id: string; type: TUserType };
