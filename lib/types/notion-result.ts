type NotionResult = {
  id: string;
  properties: {
    image?: {
      files: Array<{
        file: {
          url: string;
        };
      }>;
    };
    name?: {
      title: Array<{
        text: {
          content: string;
        };
      }>;
    };
    description?: {
      rich_text: Array<{
        text: {
          content: string;
        };
      }>;
    };
    slug?: {
      rich_text: Array<{
        text: {
          content: string;
        };
      }>;
    };
    id?: {
      unique_id?: {
        number?: number;
      };
    };
    updated_at?: {
      last_edited_time?: string;
    };
    created_at?: {
      created_time?: string;
    };
    status?: {
      select?: {
        name?: string;
      };
    };
    url?: {
      url?: string;
    };
    tags?: {
      multi_select?: Array<{
        name?: string;
      }>;
    };
  };
};

type Tag = {
  name: string;
};

type PageObjectResponse = {
  id: string;
  properties: {
    name?: {
      title: Array<{
        text: {
          content: string;
        };
      }>;
    };
    slug?: {
      rich_text: Array<{
        text: {
          content: string;
        };
      }>;
    };
    created_at?: {
      created_time?: string;
    };
    updated_at?: {
      last_edited_time?: string;
    };
  };
};

type BlockObjectResponse = {
  id: string;
  type: string;
  properties?: {
    image?: {
      files: Array<{
        file: {
          url: string;
        };
      }>;
    };
    description?: {
      rich_text: Array<{
        text: {
          content: string;
        };
      }>;
    };
    tags?: {
      multi_select?: Array<{
        name?: string;
      }>;
    };
  };
};
