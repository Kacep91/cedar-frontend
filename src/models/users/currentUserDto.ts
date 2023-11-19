import { UserAdministrationRole } from "../userAdministration/userAdministrationRole";
import { VisibleComponentUserDto } from "../userAdministration/visibleComponentDto";

export type CurrentUserDto = {
  id: string;
  login: string;
  displayName: string;
  realName: string;
  firstName: string;
  lastName: string;
  defaultAvatarId: string;
  isAvatarEmpty: boolean;
  role: UserAdministrationRole;
  visibleComponents: VisibleComponentUserDto;
};
