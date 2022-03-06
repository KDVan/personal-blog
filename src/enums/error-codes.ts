/***********************************************************************************************************************
 *                                   Copyright (C) 2022 Duy Kh. Van Ba duyvbkh134@gmail.com
 *
 *                                    This file is part of Hexon System (www.hexon.systems).
 *
 *                                 -----------------PROPRIETARY INFORMATION-----------------
 *
 *                                                This file can NOT be copied
 *
 *                              and/or distributed without the express permission of Duy Kh. Van Ba
 ***********************************************************************************************************************
 *
 *                                    -----------------FILE INFORMATION-----------------
 *                                    - Project: Personal blog
 *                                    - Class: error-codes.ts
 *                                    - Created by: Duy Kh. Van Ba
 *                                    - Created date: 06 Mar, 2022
 *
 **********************************************************************************************************************/

export enum ErrorCodes {
  INTERNAL_ERROR = 'Internal error',
  NOT_FOUND = 'NOT_FOUND',
  ROLE_NOT_FOUND = "Given role's id not found",
  PERMISSION_NOT_FOUND_ERROR = 'Permission does not found',
  NO_PERMIT = 'There is no available permit.',
  UNEXPECTED_ERROR = 'Unexpected error.',
  DUPLICATE_ROLE = 'Role name has already existed.',
  BLANK_NAME = "Role's name can't be blank.",
  GROUP_EXIST_ERROR = 'Group has already existed.',
  GROUP_NOT_FOUND_ERROR = 'Group not found.',
  USER_EXIST_ERROR = 'User already exist',
  PASSWORD_NOT_MATCH_ERROR = 'Your password does not match',
  NEW_PASSWORD_SAME_OLD_PASSWORD_ERROR = 'Your new password cannot be the same as your old password',
  USER_NOT_EXIST_ERROR = 'User is not exist',
  USER_DEACTIVATED_ERROR = 'User is deactivated',
  USER_STATUS_HAS_BEEN_UPDATED_ERROR = 'User status has been updated',
  WRONG_CREDENTIAL = 'Wrong credentials provided',
  TOKEN_EXPIRED_ERROR = 'Token has been expired',
  NOT_REQUEST_RESET_PASSWORD_ERROR = 'You do not have any request to reset password',
  ROLE_EXIST_ERROR = 'Role already exist',
  CREATE_ROLE_NOT_SUCCESS_ERROR = 'Create role does not success',
  REFRESH_TOKEN_EXPIRED_ERROR = 'Refresh token has been expired',
  AUTH_UNAUTHORIZED_ERROR = 'Unauthorized',
  PERMISSION_DUPLICATE_ERROR = 'Permission has duplicate elements',
  ROLE_DUPLICATE_ERROR = 'Role has duplicate elements',
  PERMISSION_NOT_BELONG_TO_ROLE_ERROR = 'Permissions list have some elements that do not belong to current role',
  BAD_REQUEST = 'BAD_REQUEST',
  CONFLICT = 'Conflict',
  GROUP_NOT_ACTIVATE_ERROR = 'Group is not active.',
  USER_DUPLICATE_ERROR = 'User has duplicate elements',
  PARENT_GROUP_NOT_FOUND_ERROR = 'Parent Group not found.',
  GROUP_LEVEL_REACHED_LIMIT_ERROR = 'The group level has reached the limit',
  NEW_GROUP_NAME_EXIST_ERROR = 'New group name has already existed.',
  FOLDER_EXIST_ERROR = 'Folder already exist',
  FOLDER_NOT_FOUND_ERROR = 'Folder not found',
  FILENAME_TOO_LONG_ERROR = 'Template name too long',
  TEMPLATE_EXIST_ERROR = 'Template already exist.',
  TEMPLATE_NOT_FOUND_ERROR = 'Template not found',
  UNSUPPORTED_FILE_TYPE_ERROR = 'Unsupported file type',
  UPLOAD_FAILED_TO_AWS_ERROR = 'Failed to upload file to aws',
  DELETE_FAILED_FROM_AWS_ERROR = 'Failed to delete file from aws',
  COPY_FAILED_FROM_AWS_ERROR = 'Failed to copy file from aws',
  FOLDER_NAME_EXIST_ERROR = 'Folder name already exist',
  DOC_NOT_FOUND = 'Document not found',
  DELETE_YOUR_ACCOUNT = 'Trying to delete your account.',
  DEACTIVATE_YOUR_ACCOUNT = 'Trying to deactivate your account.',
  DOCUMENT_EXIST_ERROR = 'Document already exist',
  NEW_FILE_NAME_EXIST_ERROR = 'New file name has already existed.',
  NEW_FILE_NAME_SAME_OLD_FILE_NAME_ERROR = 'The new file name is the same as the old file name',
  TARGET_FOLDER_NOT_ALLOWED_ERROR = 'New target folder is not allowed',
  POSITION_NOT_FOUND = 'Position not found',
  TEMPLATE_WORKFLOW_NOT_FOUND_ERROR = 'Template workflow not found',
  TEMPLATE_WORKFLOW_FOR_TEMPLATE_EXISTED = 'Template workflow has already been created for this template',
}
