import type { PayloadRequest } from 'payload'

export const validateGroupByPropertyType = (
  allowedTypes: string[],
  fieldName: string,
  required = false,
) => {
  return async (
    value: unknown,
    { siblingData, req }: { siblingData: any; req: PayloadRequest },
  ): Promise<true | string> => {
    if (!siblingData?.propertyType) return true

    try {
      const propertyTypeDoc = await req.payload.findByID({
        collection: 'propertyTypes',
        id: siblingData.propertyType,
      })

      const typeValue = propertyTypeDoc?.value
      if (!typeValue) return `❌ Could not resolve property type`

      // Not allowed for this property type
      if (!allowedTypes.includes(typeValue)) {
        const hasValue =
          value &&
          ((typeof value === 'object' && !Array.isArray(value)
            ? Object.values(value).some((v) => !!v)
            : !!value))
        if (hasValue) {
          return `❌ ${fieldName} not allowed for property type "${typeValue}"`
        } else {
          return true
        }
      }

      // Required check
      if (allowedTypes.includes(typeValue) && required) {
        if (value === null || value === undefined) {
          return `❌ ${fieldName} is required for property type "${typeValue}"`
        }

        // For object values (checkbox groups)
        if (typeof value === 'object' && !Array.isArray(value)) {
          const obj = value as Record<string, unknown>
          const anyChecked = Object.values(obj).some((v) => !!v)
          if (!anyChecked) {
            return `❌ Please select at least one ${fieldName} for property type "${typeValue}"`
          }
        }

        // For single values (numbers, strings, etc.)
        if (typeof value !== 'object') {
          if (!value && value !== 0) {
            return `❌ ${fieldName} is required for property type "${typeValue}"`
          }
        }
      }

      return true
    } catch (err) {
      console.error(`[Validate] Error fetching propertyType for ${fieldName}:`, err)
      return `Error validating ${fieldName}`
    }
  }
}

















export const validateCheckboxGroupByPropertyType = (
  allowedTypes: string[],
  fieldName: string,
  required = false,
) => {
  return async (
    value: unknown,
    { siblingData, req }: { siblingData: any; req: PayloadRequest },
  ): Promise<true | string> => {
    if (!siblingData?.propertyType) return true

    try {
      const propertyTypeDoc = await req.payload.findByID({
        collection: 'propertyTypes',
        id: siblingData.propertyType,
      })

      const typeValue = propertyTypeDoc?.value
      if (!typeValue) return `❌ Could not resolve property type`

      // Not allowed for this property type
      if (!allowedTypes.includes(typeValue)) {
        const anyValue = value && typeof value === 'object' && !Array.isArray(value)
          ? Object.values(value).some(Boolean)
          : false
        if (anyValue) {
          return `❌ ${fieldName} not allowed for property type "${typeValue}"`
        } else {
          return true
        }
      }

      // Required check
      if (allowedTypes.includes(typeValue) && required) {
        if (!value || typeof value !== 'object' || Array.isArray(value)) {
          return `❌ ${fieldName} is required for property type "${typeValue}"`
        }

        const obj = value as Record<string, unknown>
        const anyChecked = Object.values(obj).some((v) => v === true)
        if (!anyChecked) {
          return `❌ Please select at least one ${fieldName} for property type "${typeValue}"`
        }
      }

      return true
    } catch (err) {
      console.error(`[Validate] Error validating ${fieldName}:`, err)
      return `Error validating ${fieldName}`
    }
  }
}



export const validateDimensionsByPropertyType = (
  allowedTypes: string[],
  fieldName: string,
  required = false,
) => {
  return async (
    value: unknown,
    { siblingData, req }: { siblingData: any; req: PayloadRequest },
  ): Promise<true | string> => {
    if (!siblingData?.propertyType) return true

    try {
      const propertyTypeDoc = await req.payload.findByID({
        collection: 'propertyTypes',
        id: siblingData.propertyType,
      })

      const typeValue = propertyTypeDoc?.value
      if (!typeValue) return `❌ Could not resolve property type`

      // Not allowed for this property type
      if (!allowedTypes.includes(typeValue)) {
        const hasValue =
          value &&
          typeof value === 'object' &&
          !Array.isArray(value) &&
          Object.values(value).some((v) => v !== undefined && v !== null)
        if (hasValue) {
          return `❌ ${fieldName} not allowed for property type "${typeValue}"`
        } else {
          return true
        }
      }

      // Required check
      if (allowedTypes.includes(typeValue) && required) {
        if (!value || typeof value !== 'object' || Array.isArray(value)) {
          return `❌ ${fieldName} is required for property type "${typeValue}"`
        }

        const obj = value as Record<string, unknown>

        // Check both fields exist (allow 0)
        if (obj.length === undefined || obj.width === undefined) {
          return `❌ Both length and width are required in ${fieldName} for property type "${typeValue}"`
        }

        // Check both fields are numbers
        if (typeof obj.length !== 'number' || typeof obj.width !== 'number') {
          return `❌ Length and width in ${fieldName} must be valid numbers for property type "${typeValue}"`
        }
      }

      return true
    } catch (err) {
      console.error(`[Validate] Error validating ${fieldName}:`, err)
      return `Error validating ${fieldName}`
    }
  }
}

export const validatePrimitiveByPropertyType = (
  allowedTypes: string[],
  fieldName: string,
  required = false,
) => {
  return async (
    value: number | number[] | string | null | undefined,
    { siblingData, req }: { siblingData: any; req: PayloadRequest },
  ): Promise<true | string> => {
    if (!siblingData?.propertyType) return true

    try {
      const propertyTypeDoc = await req.payload.findByID({
        collection: 'propertyTypes',
        id: siblingData.propertyType,
      })

      const typeValue = propertyTypeDoc?.value
      if (!typeValue) return `❌ Could not resolve property type`

      // ❌ Field not allowed but has value
      if (!allowedTypes.includes(typeValue) && value) {
        return `❌ ${fieldName} not allowed for property type "${typeValue}"`
      }

      if (allowedTypes.includes(typeValue) && required) {
        // if array
        if (Array.isArray(value)) {
          if (value.length === 0 || value.some((v) => v === null || isNaN(v as number))) {
            return `❌ ${fieldName} is required and must be valid for property type "${typeValue}"`
          }
        } else {
          // single value
          if (value === null || value === undefined) {
            return `❌ ${fieldName} is required for property type "${typeValue}"`
          }
          if (typeof value === 'string' && value.trim() === '') {
            return `❌ ${fieldName} is required for property type "${typeValue}"`
          }
          if (typeof value === 'number' && isNaN(value)) {
            return `❌ ${fieldName} must be a valid number for property type "${typeValue}"`
          }
        }
      }

      return true
    } catch (err) {
      console.error(`[Validate] Error validating ${fieldName}:`, err)
      return `Error validating ${fieldName}`
    }
  }
}

