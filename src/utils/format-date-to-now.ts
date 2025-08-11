import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

export const formatDateFromNow = (dateString: string): string => {
	dayjs.extend(customParseFormat)
	dayjs.extend(utc)
	dayjs.extend(timezone)
	dayjs.extend(relativeTime)

	try {
		const apiTimezone = 'UTC'
		const dateInOriginalTimezone = dayjs.tz(
			dateString,
			'DD-MMM-YYYY HH:mm',
			apiTimezone
		)

		if (!dateInOriginalTimezone.isValid()) {
			console.error('Data inválida na conversão inicial:', dateString)
			return 'Data inválida'
		}

		const userTimezone = dayjs.tz.guess()

		const dateInUserTimezone = dateInOriginalTimezone.tz(userTimezone)

		return dateInUserTimezone.fromNow()
	} catch (error) {
		console.error('Erro ao formatar data:', error)
		return 'Data inválida'
	}
}
